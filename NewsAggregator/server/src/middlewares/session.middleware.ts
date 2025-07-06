import { Request, Response, NextFunction } from 'express';
import { UserSessionRepository } from '../repositories/UserSessionRepository';
import { Logger } from '../infrastructure/logger/Logger';

const logger = Logger.getInstance();

export const requireSession = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Session ')) {
    res.status(401).json({ error: 'Session token missing or invalid' });
    return;
  }

  const token = authHeader.replace('Session ', '').trim();

  UserSessionRepository.findByToken(token)
    .then((session) => {
      if (!session || !session.is_active || new Date(session.expires_at) < new Date()) {
        res.status(401).json({ error: 'Session expired or invalid' });
        return;
      }

      req.user = session.user;
      next();
    })
    .catch((err) => {
      Logger.getInstance().error('[Session Middleware] Error', err);
      res.status(500).json({ error: 'Internal session error' });
    });
};

