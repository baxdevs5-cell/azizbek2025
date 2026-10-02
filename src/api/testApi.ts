import { apiClient } from './client.ts';
import { Test, TestResult } from '../../shared/types/index.ts';

export interface TestSubmitResponse {
  score: number;
  total: number;
  percentage: number;
  results: {
    question_id: string;
    is_correct: boolean;
    correct_key: string;
  }[];
}

export const testApi = {
  getAll: async () => {
    return apiClient<Test[]>('/tests');
  },

  getById: async (id: string) => {
    return apiClient<Test>(`/tests/${id}`);
  },

  submit: async (id: string, answers: Record<string, string>, timeSpentSeconds: number) => {
    return apiClient<TestSubmitResponse>(`/tests/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({
        answers,
        time_spent_seconds: timeSpentSeconds
      })
    });
  },

  getMyResults: async () => {
    return apiClient<TestResult[]>('/tests/results');
  }
};
