import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export const getFavorites = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const favorites = db.getFavoritesByUser(userId);
    return res.json({
      success: true,
      data: favorites
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Tanlangan so‘zlarni yuklashda xatolik.'
    });
  }
};

export const addFavorite = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const { vocabulary_id } = req.body;

    if (!vocabulary_id) {
      return res.status(400).json({
        success: false,
        message: 'vocabulary_id kiritilishi shart.'
      });
    }

    const fav = db.addFavorite(userId, vocabulary_id);
    if (!fav) {
      return res.status(404).json({
        success: false,
        message: 'Lug‘at so‘zi topilmadi.'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'So‘z saralanganlar ro‘yxatiga qo‘shildi.',
      data: fav
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'So‘zni saqlashda xatolik.'
    });
  }
};

export const removeFavorite = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const { id } = req.params;

    const removed = db.removeFavorite(userId, id);
    return res.json({
      success: true,
      message: 'So‘z saralanganlardan olib tashlandi.',
      removed
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Olib tashlashda xatolik.'
    });
  }
};
