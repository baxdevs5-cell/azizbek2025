import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getProfile = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const user = db.findUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.'
      });
    }

    const stats = db.getDashboardStats(userId);

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
    return res.status(500).json({
      success: false,
      message: 'Profil ma’lumotlarini olishda xatolik.'
    });
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const { full_name, grade, current_password, new_password } = req.body;

    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.'
      });
    }

    const updates: Partial<typeof user> = {};

    if (full_name && full_name.trim()) {
      updates.full_name = full_name.trim();
    }

    if (grade && grade.trim()) {
      updates.grade = grade.trim();
    }

    if (new_password) {
      if (new_password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Yangi parol kamida 6 ta belgidan iborat bo‘lishi lozim.'
        });
      }

      if (user.password_hash) {
        if (!current_password) {
          return res.status(400).json({
            success: false,
            message: 'Joriy parolni kiritish zarur.'
          });
        }
        const matches = await bcrypt.compare(current_password, user.password_hash);
        if (!matches) {
          return res.status(400).json({
            success: false,
            message: 'Joriy parol noto‘g‘ri kiritildi.'
          });
        }
      }

      const salt = await bcrypt.genSalt(10);
      updates.password_hash = await bcrypt.hash(new_password, salt);
    }

    const updated = db.updateUser(userId, updates);
    if (!updated) {
      return res.status(500).json({
        success: false,
        message: 'Profilni saqlashda xatolik.'
      });
    }

    return res.json({
      success: true,
      message: 'Profil ma’lumotlari muvaffaqiyatli yangilandi.',
      data: {
        id: updated.id,
        full_name: updated.full_name,
        email: updated.email,
        grade: updated.grade,
        role: updated.role,
        created_at: updated.created_at
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Profilni yangilashda xatolik yuz berdi.'
    });
  }
};
