import { Request, Response, NextFunction } from 'express';
import { SessionRepository } from '../repositories/UserSessionRepository';

export async function requireSession(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Session ')) {
    return res.status(401).json({ error: 'Missing or invalid session token' });
  }

  const token = authHeader.replace('Session ', '').trim();

  try {
    const session = await SessionRepository.findByToken(token);
    if (!session || !session.is_active || new Date(session.expires_at) < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    req.user = session.user;
    next();
  } catch (err) {
    console.error('[SESSION ERROR]', err);
    res.status(500).json({ error: 'Session validation failed' });
  }
}
