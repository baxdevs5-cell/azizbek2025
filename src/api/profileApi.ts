import { apiClient } from './client.ts';
import { UserProfileResponse } from '../../shared/types/index.ts';

export const profileApi = {
  getProfile: async () => {
    return apiClient<UserProfileResponse>('/profile');
  },

  updateProfile: async (data: {
    full_name?: string;
    grade?: string;
    current_password?: string;
    new_password?: string;
  }) => {
    return apiClient<UserProfileResponse>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};
