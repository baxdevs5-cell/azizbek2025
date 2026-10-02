import { Router } from 'express';
import authRoutes from './authRoutes.ts';
import lessonRoutes from './lessonRoutes.ts';
import vocabularyRoutes from './vocabularyRoutes.ts';
import exerciseRoutes from './exerciseRoutes.ts';
import testRoutes from './testRoutes.ts';
import progressRoutes from './progressRoutes.ts';
import profileRoutes from './profileRoutes.ts';
import favoriteRoutes from './favoriteRoutes.ts';
import adminRoutes from './adminRoutes.ts';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/lessons', lessonRoutes);
apiRouter.use('/vocabulary', vocabularyRoutes);
apiRouter.use('/exercises', exerciseRoutes);
apiRouter.use('/tests', testRoutes);
apiRouter.use('/progress', progressRoutes);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/favorites', favoriteRoutes);
apiRouter.use('/admin', adminRoutes);

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

export default apiRouter;
