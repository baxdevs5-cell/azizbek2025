import express, { Request, Response, NextFunction } from 'express';
import apiRouter from './routes/index.ts';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API router
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Server Error:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Kutilmagan server xatoligi yuz berdi.'
    });
  });

  return app;
}
