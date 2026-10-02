import { apiClient } from './client.ts';
import { VocabularyItem, Favorite } from '../../shared/types/index.ts';

export const vocabularyApi = {
  getAll: async (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return apiClient<VocabularyItem[]>(`/vocabulary${query}`);
  },

  getById: async (id: string) => {
    return apiClient<VocabularyItem>(`/vocabulary/${id}`);
  },

  create: async (data: Partial<VocabularyItem>) => {
    return apiClient<VocabularyItem>('/vocabulary', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  update: async (id: string, data: Partial<VocabularyItem>) => {
    return apiClient<VocabularyItem>(`/vocabulary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  delete: async (id: string) => {
    return apiClient<{ message: string }>(`/vocabulary/${id}`, {
      method: 'DELETE'
    });
  },

  getFavorites: async () => {
    return apiClient<Favorite[]>('/favorites');
  },

  addFavorite: async (vocabulary_id: string) => {
    return apiClient<Favorite>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ vocabulary_id })
    });
  },

  removeFavorite: async (vocabulary_id: string) => {
    return apiClient<{ success: boolean }>(`/favorites/${vocabulary_id}`, {
      method: 'DELETE'
    });
  }
};
