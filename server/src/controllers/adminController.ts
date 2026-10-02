import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getUsers = (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = db.getAllUsers();
    return res.json({
      success: true,
      data: users
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Foydalanuvchilarni yuklashda xatolik.'
    });
  }
};

export const updateUserRole = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Noto‘g‘ri rol turi.'
      });
    }

    const updated = db.updateUser(id, { role });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.'
      });
    }

    return res.json({
      success: true,
      message: 'Foydalanuvchi roli o‘zgartirildi.',
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Rolni o‘zgartirishda xatolik.'
    });
  }
};

export const deleteUser = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (id === req.user?.id) {
      return res.status(400).json({
        success: false,
        message: 'O‘z hisobingizni o‘chira olmaysiz.'
      });
    }

    const deleted = db.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Foydalanuvchi topilmadi.'
      });
    }

    return res.json({
      success: true,
      message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Foydalanuvchini o‘chirishda xatolik.'
    });
  }
};

export const getSystemStats = (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = db.getAllUsers();
    const lessons = db.getLessons();
    const vocabulary = db.getVocabulary();
    const exercises = db.getExercises();
    const tests = db.getTests();

    return res.json({
      success: true,
      data: {
        total_users: users.length,
        total_students: users.filter(u => u.role === 'student').length,
        total_teachers: users.filter(u => u.role === 'teacher').length,
        total_lessons: lessons.length,
        total_vocabulary: vocabulary.length,
        total_exercises: exercises.length,
        total_tests: tests.length
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Statistikani olishda xatolik.'
    });
  }
};
