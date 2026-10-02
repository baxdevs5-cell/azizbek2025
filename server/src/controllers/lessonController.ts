import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getLessons = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const lessons = db.getLessons(userId);
    return res.json({
      success: true,
      data: lessons
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Darslarni yuklashda xatolik yuz berdi.'
    });
  }
};

export const getLessonById = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const lesson = db.getLessonById(id, userId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Dars topilmadi.'
      });
    }

    return res.json({
      success: true,
      data: lesson
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Dars ma’lumotlarini olishda xatolik.'
    });
  }
};

export const createLesson = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, description, order_index, difficulty } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Dars sarlavhasi va tavsifi kiritilishi shart.'
      });
    }

    const newLesson = db.createLesson({
      title,
      description,
      order_index: order_index || 1,
      difficulty: difficulty || 'Easy'
    });

    return res.status(201).json({
      success: true,
      message: 'Yangi dars muvaffaqiyatli qo‘shildi.',
      data: newLesson
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Dars yaratishda xatolik yuz berdi.'
    });
  }
};

export const updateLesson = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = db.updateLesson(id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Yangilanuvchi dars topilmadi.'
      });
    }
    return res.json({
      success: true,
      message: 'Dars ma’lumotlari yangilandi.',
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Darsni yangilashda xatolik.'
    });
  }
};

export const deleteLesson = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteLesson(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'O‘chiriluvchi dars topilmadi.'
      });
    }
    return res.json({
      success: true,
      message: 'Dars muvaffaqiyatli o‘chirildi.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Darsni o‘chirishda xatolik.'
    });
  }
};
