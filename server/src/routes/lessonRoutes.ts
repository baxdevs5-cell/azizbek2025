import { Router } from 'express';
import {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
} from '../controllers/lessonController.ts';
import { optionalAuth, requireTeacherOrAdmin, requireAdmin } from '../middleware/auth.ts';

const router = Router();

router.get('/', optionalAuth, getLessons);
router.get('/:id', optionalAuth, getLessonById);
router.post('/', requireTeacherOrAdmin, createLesson);
router.put('/:id', requireTeacherOrAdmin, updateLesson);
router.delete('/:id', requireAdmin, deleteLesson);

export default router;
