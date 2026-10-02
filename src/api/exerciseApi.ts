import { apiClient } from './client.ts';
import { Exercise } from '../../shared/types/index.ts';

export interface ExerciseSubmitResult {
  is_correct: boolean;
  correct_option_key: string;
  explanation: string;
}

export const exerciseApi = {
  getAll: async (lessonId?: string) => {
    const query = lessonId ? `?lesson_id=${lessonId}` : '';
    return apiClient<Exercise[]>(`/exercises${query}`);
  },

  getById: async (id: string) => {
    return apiClient<Exercise>(`/exercises/${id}`);
  },

  submit: async (id: string, selectedOption: string) => {
    return apiClient<ExerciseSubmitResult>(`/exercises/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ selected_option: selectedOption })
    });
  }
};
