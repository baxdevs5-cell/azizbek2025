import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  submitExercise
} from '../controllers/exerciseController.ts';
import { optionalAuth } from '../middleware/auth.ts';

const router = Router();

router.get('/', optionalAuth, getExercises);
router.get('/:id', optionalAuth, getExerciseById);
router.post('/:id/submit', optionalAuth, submitExercise);

export default router;
