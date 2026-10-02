import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getProgress = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const progressList = db.getProgressByUser(userId);
    const stats = db.getDashboardStats(userId);

    return res.json({
      success: true,
      data: {
        progress: progressList,
        stats
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Progress ma’lumotlarini olishda xatolik.'
    });
  }
};

export const updateProgress = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const { lesson_id, progress_percentage } = req.body;

    if (!lesson_id || progress_percentage === undefined) {
      return res.status(400).json({
        success: false,
        message: 'lesson_id va progress_percentage ko‘rsatilishi kerak.'
      });
    }

    const updated = db.updateLessonProgress(
      userId,
      lesson_id,
      Number(progress_percentage)
    );

    return res.json({
      success: true,
      message: 'Progress saqlandi.',
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Progressni yangilashda xatolik.'
    });
  }
};
