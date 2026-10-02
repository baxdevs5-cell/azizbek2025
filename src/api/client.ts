import { ApiResponse } from '../../shared/types/index.ts';

const TOKEN_KEY = 'english6_auth_token';

export const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Failed to set token:', e);
  }
};

export const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Failed to remove token:', e);
  }
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`/api${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Xatolik yuz berdi (${res.status})`,
        error: data?.error
      };
    }

    return data as ApiResponse<T>;
  } catch (err: any) {
    console.error('API Client error:', err);
    return {
      success: false,
      message: 'Serverga ulanishda xatolik yuz berdi. Internet aloqasini tekshiring.'
    };
  }
}
