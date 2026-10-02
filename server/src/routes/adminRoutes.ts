import { Router } from 'express';
import {
  getUsers,
  updateUserRole,
  deleteUser,
  getSystemStats
} from '../controllers/adminController.ts';
import { requireAuth, requireAdmin } from '../middleware/auth.ts';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.get('/stats', getSystemStats);

export default router;
