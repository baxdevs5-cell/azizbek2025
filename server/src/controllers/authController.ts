import { Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.ts';
import { db } from '../db/database.ts';
import { AuthenticatedRequest, JwtPayload } from '../middleware/auth.ts';

function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export const register = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { full_name, email, password, confirm_password, grade } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'To‘liq ism, email va parol kiritilishi shart.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak.'
      });
    }

    if (confirm_password && password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: 'Parollar bir-biriga mos kelmadi.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email manzili formati noto‘g‘ri.'
      });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Ushbu email bilan ro‘yxatdan o‘tilgan. Tizimga kiring.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = db.createUser({
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      password_hash,
      grade: grade ? grade.trim() : '6-sinf',
      role: 'student'
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      grade: user.grade
    });

    return res.status(201).json({
      success: true,
      message: 'Muvaffaqiyatli ro‘yxatdan o‘tdingiz!',
      data: {
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          grade: user.grade,
          role: user.role,
          created_at: user.created_at
        }
      }
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({
      success: false,
      message: 'Serverda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.'
    });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email va parolni kiriting.'
      });
    }

    const user = db.findUserByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(401).json({
        success: false,
        message: 'Email yoki parol noto‘g‘ri.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email yoki parol noto‘g‘ri.'
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      grade: user.grade
    });

    return res.json({
      success: true,
      message: 'Hush kelibsiz!',
      data: {
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          grade: user.grade,
          role: user.role,
          created_at: user.created_at
        }
      }
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Serverda xatolik yuz berdi. Iltimos qayta urinib ko‘ring.'
    });
  }
};

export const getMe = (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Foydalanuvchi aniqlanmadi.'
      });
    }

    const user = db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.'
      });
    }

    const stats = db.getDashboardStats(user.id);

    return res.json({
      success: true,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        grade: user.grade,
        role: user.role,
        created_at: user.created_at,
        stats: {
          completed_lessons: stats.completed_lessons,
          total_lessons: stats.total_lessons,
          completed_exercises: stats.completed_exercises,
          total_exercises: stats.total_exercises,
          tests_taken: stats.tests_completed,
          average_test_score: stats.average_test_score,
          vocabulary_learned: stats.vocabulary_learned,
          overall_progress: stats.overall_progress
        }
      }
    });
  } catch (err: any) {
    console.error('getMe error:', err);
    return res.status(500).json({
      success: false,
      message: 'Serverda xatolik.'
    });
  }
};
