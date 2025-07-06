import { Request, Response, NextFunction } from 'express';
import { Logger } from '../infrastructure/logger/Logger';
import { CustomError } from '../core/errors/CustomError';

const logger = Logger.getInstance();

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  logger.error('[Global Error Handler]', err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
}
