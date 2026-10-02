import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';
import { db } from '../db/database.ts';
import { UserRole } from '@/shared/types/index.ts';

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  grade: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = decoded;
  } catch (err) {
    // Token is invalid/expired, continue as unauthenticated
  }
  next();
};

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Avtorizatsiyadan o‘tishingiz kerak. Iltimos, tizimga kiring.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    const user = db.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Foydalanuvchi topilmadi yoki token eskirgan.'
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      grade: user.grade
    };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Yaroqsiz yoki muddati o‘tgan token. Qaytadan kiring.'
    });
  }
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Ushbu amalni bajarish uchun faqat Administrator huquqi talab etiladi.'
    });
  }
  next();
};

export const requireTeacherOrAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'teacher')) {
    return res.status(403).json({
      success: false,
      message: 'Ushbu amalni bajarish uchun O‘qituvchi yoki Admin huquqi talab etiladi.'
    });
  }
  next();
};
