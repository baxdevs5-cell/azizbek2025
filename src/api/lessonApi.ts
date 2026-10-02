import { apiClient } from './client.ts';
import { Lesson } from '../../shared/types/index.ts';

export const lessonApi = {
  getAll: async () => {
    return apiClient<Lesson[]>('/lessons');
  },

  getById: async (id: string) => {
    return apiClient<Lesson>(`/lessons/${id}`);
  },

  create: async (data: Partial<Lesson>) => {
    return apiClient<Lesson>('/lessons', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  update: async (id: string, data: Partial<Lesson>) => {
    return apiClient<Lesson>(`/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  delete: async (id: string) => {
    return apiClient<{ message: string }>(`/lessons/${id}`, {
      method: 'DELETE'
    });
  }
};
