import UserModel from 'models/user-model';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from 'service/mail-service';
import tokenService from 'service/token-service';
import UserDto from 'dtos/user-dto';
import ApiError from 'exceptions/api-error';
import dotenv from 'dotenv';

dotenv.config();

export interface UserData {
  userDto: UserDto;
  accessToken: string;
  refreshToken: string;
}

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({email});
    if (candidate) {
      throw ApiError.BadRequest(`The user with the email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink
    });

    await mailService.sendActivationMail(
      email, 
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto};
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({activationLink});

    if (!user) {
      throw ApiError.BadRequest('Invalid activation link');
    }

    user.isActivated = true;
    await user.save();
  }
}

export default new UserService();
