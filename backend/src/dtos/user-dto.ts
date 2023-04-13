import { UserDoc } from 'models/user-model';

class UserDto {
  email: string;
  id: number;
  isActivated: boolean;

  constructor(model: UserDoc) {
    this.email = model.email;
    this.id = model._id
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
