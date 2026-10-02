import { apiClient } from './client.ts';
import { Progress, DashboardStats } from '../../shared/types/index.ts';

export const progressApi = {
  getProgress: async () => {
    return apiClient<{ progress: Progress[]; stats: DashboardStats }>('/progress');
  },

  updateProgress: async (lessonId: string, percentage: number) => {
    return apiClient<Progress>('/progress', {
      method: 'POST',
      body: JSON.stringify({
        lesson_id: lessonId,
        progress_percentage: percentage
      })
    });
  }
};
