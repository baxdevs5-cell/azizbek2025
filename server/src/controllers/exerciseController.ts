import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';
import { ExerciseOption } from '@/shared/types/index.ts';

export const getExercises = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { lesson_id } = req.query;
    const exercises = db.getExercises(lesson_id as string | undefined);

    // Hide is_correct in public client view if needed, but for exercises with explanations we can return options
    const sanitized = exercises.map(ex => ({
      ...ex,
      options: ex.options.map((o: ExerciseOption) => ({
        id: o.id,
        exercise_id: o.exercise_id,
        option_key: o.option_key,
        option_text: o.option_text
      }))
    }));

    return res.json({
      success: true,
      data: sanitized
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Mashqlarni yuklashda xatolik.'
    });
  }
};

export const getExerciseById = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const ex = db.getExerciseById(id);
    if (!ex) {
      return res.status(404).json({
        success: false,
        message: 'Mashq topilmadi.'
      });
    }

    return res.json({
      success: true,
      data: {
        ...ex,
        options: ex.options.map((o: ExerciseOption) => ({
          id: o.id,
          exercise_id: o.exercise_id,
          option_key: o.option_key,
          option_text: o.option_text
        }))
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Mashqni olishda xatolik.'
    });
  }
};

export const submitExercise = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { selected_option } = req.body;

    if (!selected_option) {
      return res.status(400).json({
        success: false,
        message: 'Javob variantini tanlang.'
      });
    }

    const check = db.checkExerciseAnswer(id, selected_option);
    if (!check) {
      return res.status(404).json({
        success: false,
        message: 'Mashq topilmadi.'
      });
    }

    // If user is authenticated, we can optionally bump user progress
    if (req.user && check.is_correct) {
      const ex = db.getExerciseById(id);
      if (ex && ex.lesson_id) {
        db.updateLessonProgress(req.user.id, ex.lesson_id, 80);
      }
    }

    return res.json({
      success: true,
      data: {
        is_correct: check.is_correct,
        correct_option_key: check.correct_option_key,
        explanation: check.explanation
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Mashq javobini tekshirishda xatolik.'
    });
  }
};
