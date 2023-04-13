import { Request, Response, NextFunction } from "express";
import userService, { UserData } from "service/user-service";

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserData>> {
    try {
        const {email, password } = req.body;
        const userData = await userService.registration(email, password);

        res.cookie(
          'refreshToken',
          await userData.refreshToken,
          {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        )

        return res.json(userData);
    } catch (error) {
        console.log(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }

  async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
      
    }
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.json(['123', 'sdf13312'])
    } catch (error) {
      
    }
  }
}

export default new UserController();
