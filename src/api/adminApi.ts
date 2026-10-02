import { apiClient } from './client.ts';
import { User } from '../../shared/types/index.ts';

export interface AdminStats {
  total_users: number;
  total_students: number;
  total_teachers: number;
  total_lessons: number;
  total_vocabulary: number;
  total_exercises: number;
  total_tests: number;
}

export const adminApi = {
  getUsers: async () => {
    return apiClient<User[]>('/admin/users');
  },

  updateUserRole: async (id: string, role: 'student' | 'teacher' | 'admin') => {
    return apiClient<User>(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  },

  deleteUser: async (id: string) => {
    return apiClient<{ success: boolean; message: string }>(`/admin/users/${id}`, {
      method: 'DELETE'
    });
  },

  getStats: async () => {
    return apiClient<AdminStats>('/admin/stats');
  }
};
