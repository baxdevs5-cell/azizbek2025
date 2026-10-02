import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getVocabulary = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category, search } = req.query;
    const userId = req.user?.id;
    const items = db.getVocabulary(
      category as string | undefined,
      search as string | undefined,
      userId
    );
    return res.json({
      success: true,
      data: items
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Lug‘atni yuklashda xatolik yuz berdi.'
    });
  }
};

export const getVocabularyById = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const item = db.getVocabularyById(id, userId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Lug‘at so‘zi topilmadi.'
      });
    }

    return res.json({
      success: true,
      data: item
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'So‘z ma’lumotini olishda xatolik.'
    });
  }
};

export const createVocabulary = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { word, translation, example, category, lesson_id } = req.body;
    if (!word || !translation) {
      return res.status(400).json({
        success: false,
        message: 'Inglizcha so‘z va o‘zbekcha tarjimasi kiritilishi shart.'
      });
    }

    const newItem = db.createVocabulary({
      word: word.trim(),
      translation: translation.trim(),
      example: example || '',
      category: category || 'General',
      lesson_id: lesson_id || 'lesson-1'
    });

    return res.status(201).json({
      success: true,
      message: 'Yangi so‘z qo‘shildi.',
      data: newItem
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'So‘z qo‘shishda xatolik yuz berdi.'
    });
  }
};

export const updateVocabulary = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = db.updateVocabulary(id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Yangilanuvchi so‘z topilmadi.'
      });
    }
    return res.json({
      success: true,
      message: 'So‘z muvaffaqiyatli yangilandi.',
      data: updated
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'So‘zni yangilashda xatolik.'
    });
  }
};

export const deleteVocabulary = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteVocabulary(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'O‘chiriluvchi so‘z topilmadi.'
      });
    }
    return res.json({
      success: true,
      message: 'So‘z muvaffaqiyatli o‘chirildi.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'So‘zni o‘chirishda xatolik.'
    });
  }
};
