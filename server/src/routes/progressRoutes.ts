import { Router } from 'express';
import { getProgress, updateProgress } from '../controllers/progressController.ts';
import { optionalAuth } from '../middleware/auth.ts';

const router = Router();

router.get('/', optionalAuth, getProgress);
router.post('/', optionalAuth, updateProgress);

export default router;
