import { Router } from 'express';
import {
  getVocabulary,
  getVocabularyById,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary
} from '../controllers/vocabularyController.ts';
import { optionalAuth, requireTeacherOrAdmin, requireAdmin } from '../middleware/auth.ts';

const router = Router();

router.get('/', optionalAuth, getVocabulary);
router.get('/:id', optionalAuth, getVocabularyById);
router.post('/', requireTeacherOrAdmin, createVocabulary);
router.put('/:id', requireTeacherOrAdmin, updateVocabulary);
router.delete('/:id', requireAdmin, deleteVocabulary);

export default router;
