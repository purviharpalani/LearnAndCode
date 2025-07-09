import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { Logger } from '../../../infrastructure/logger/Logger';
import { CustomError } from '../../../core/errors/CustomError';
import { IAuthService } from '../../../core/interfaces/IAuthService';

export class AuthController {
  private static service: IAuthService = new AuthService();
  private static logger = Logger.getInstance();

  static async signup(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthController.service.signup(req.body);
      res.status(201).json({ message: 'User created successfully', ...result });
    } catch (err) {
      AuthController.logger.error('[SIGNUP ERROR] ' + (err as Error).message);
      const status = err instanceof CustomError ? err.statusCode : 500;
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(status).json({ error: errorMessage });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await AuthController.service.login(req.body);
      res.status(200).json(result);
    } catch (err) {
      AuthController.logger.error('[LOGIN ERROR] ' + (err as Error).message);
      const status = err instanceof CustomError ? err.statusCode : 500;
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      res.status(status).json({ error: errorMessage });
    }
  }
}
