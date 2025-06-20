// src/middlewares/session.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/db';
import { UserSession } from '../entities/UserSession';

const sessionRepo = AppDataSource.getRepository(UserSession);

export const requireSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Session ')) {
      res.status(401).json({ error: 'Session token missing' });
      return; // ✅ Exit early
    }

    const session_token = authHeader.replace('Session ', '').trim();
    const session = await sessionRepo.findOne({
      where: { session_token },
      relations: ['user'],
    });

    if (!session || !session.user.is_active) {
      res.status(401).json({ error: 'Invalid or expired session' });
      return;
    }

    (req as any).user = session.user;
    next();
  } catch (err) {
    console.error('[SESSION MIDDLEWARE ERROR]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
