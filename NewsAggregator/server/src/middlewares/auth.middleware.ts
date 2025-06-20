// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (user?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
};
