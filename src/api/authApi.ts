import { apiClient, setStoredToken, removeStoredToken } from './client.ts';
import { AuthResponse, UserProfileResponse } from '../../shared/types/index.ts';

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.success && res.data?.token) {
      setStoredToken(res.data.token);
    }
    return res;
  },

  register: async (data: {
    full_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    grade?: string;
  }) => {
    const res = await apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.success && res.data?.token) {
      setStoredToken(res.data.token);
    }
    return res;
  },

  getMe: async () => {
    return apiClient<UserProfileResponse>('/auth/me');
  },

  logout: () => {
    removeStoredToken();
  }
};
