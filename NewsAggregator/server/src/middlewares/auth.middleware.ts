import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Logger } from '../infrastructure/logger/Logger';

const logger = Logger.getInstance();

interface JwtPayload {
  id: number;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}

// Middleware 1: Authenticate via Bearer Token
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    logger.error('[Auth Middleware] Invalid token', err);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ✅ Middleware 2: Role-based authorization
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Forbidden: Admins only' });
    return;
  }
  next();
};
