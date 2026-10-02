import { Router } from 'express';
import {
  getTests,
  getTestById,
  submitTest,
  getMyResults
} from '../controllers/testController.ts';
import { optionalAuth } from '../middleware/auth.ts';

const router = Router();

router.get('/', optionalAuth, getTests);
router.get('/results', optionalAuth, getMyResults);
router.get('/:id', optionalAuth, getTestById);
router.post('/:id/submit', optionalAuth, submitTest);

export default router;
