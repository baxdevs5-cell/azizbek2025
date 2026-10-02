import { Response } from 'express';
import { db } from '../db/database.ts';
import { AuthenticatedRequest } from '../middleware/auth.ts';
import { TestQuestion, TestOption } from '@/shared/types/index.ts';

export const getTests = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const tests = db.getTests(userId);
    return res.json({
      success: true,
      data: tests
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Testlarni yuklashda xatolik yuz berdi.'
    });
  }
};

export const getTestById = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const test = db.getTestById(id, userId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test topilmadi.'
      });
    }

    // Hide is_correct from questions in client view
    const sanitizedQuestions = (test.questions || []).map((q: TestQuestion) => ({
      id: q.id,
      test_id: q.test_id,
      question: q.question,
      order_index: q.order_index,
      options: q.options.map((opt: TestOption) => ({
        id: opt.id,
        question_id: opt.question_id,
        option_key: opt.option_key,
        option_text: opt.option_text
      }))
    }));

    return res.json({
      success: true,
      data: {
        ...test,
        questions: sanitizedQuestions
      }
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Test ma’lumotlarini olishda xatolik.'
    });
  }
};

export const submitTest = (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { answers, time_spent_seconds } = req.body;
    const userId = req.user?.id || 'user-student'; // Fallback to student if guest

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Javoblar yuborilmadi.'
      });
    }

    const submissionResult = db.submitTestResult(
      userId,
      id,
      answers,
      time_spent_seconds || 0
    );

    if (!submissionResult) {
      return res.status(404).json({
        success: false,
        message: 'Test topilmadi.'
      });
    }

    return res.json({
      success: true,
      message: 'Test natijalari muvaffaqiyatli hisoblandi!',
      data: submissionResult
    });
  } catch (err: any) {
    console.error('Error submitting test:', err);
    return res.status(500).json({
      success: false,
      message: 'Test natijasini hisoblashda xatolik yuz berdi.'
    });
  }
};

export const getMyResults = (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id || 'user-student';
    const results = db.getTestResultsByUser(userId);
    return res.json({
      success: true,
      data: results
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: 'Natijalarni yuklashda xatolik.'
    });
  }
};
