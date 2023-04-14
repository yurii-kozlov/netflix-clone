import { Request, Response, NextFunction } from "express";
import userService, { UserData } from "service/user-service";
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import ApiError from "exceptions/api-error";

dotenv.config();

class UserController {
  async registration(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<UserData> | void> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(ApiError.BadRequest('Validation Error', errors.array()))
        }
        const { email, password } = req.body;
        const userData = await userService.registration(email, password);

        res.cookie(
          'refreshToken',
          userData.refreshToken,
          {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}
        );

        return res.json(userData);
    } catch (error) {
        next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
        next(error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
        next(error);
    }
  }

  async activate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
        next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
    } catch (error) {
        next(error);
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
        next(error);
    }
  }
}

export default new UserController();
