/**
 * Shared Type Definitions for English 6-sinf
 */

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  full_name: string;
  email: string;
  password_hash?: string;
  grade: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UserProfileResponse {
  id: string;
  full_name: string;
  email: string;
  grade: string;
  role: UserRole;
  created_at: string;
  stats?: {
    completed_lessons: number;
    total_lessons: number;
    completed_exercises: number;
    total_exercises: number;
    tests_taken: number;
    average_test_score: number;
    vocabulary_learned: number;
    overall_progress: number;
  };
}

export interface LessonSection {
  id: string;
  lesson_id: string;
  title: string;
  content: string; // Grammar explanation or text
  order_index: number;
}

export interface VocabularyItem {
  id: string;
  lesson_id: string;
  word: string;
  translation: string;
  example: string;
  category: string;
  audio_url?: string;
  created_at: string;
  is_favorite?: boolean;
}

export type ExerciseType = 'multiple_choice' | 'true_false' | 'fill_in_the_blank' | 'matching';

export interface ExerciseOption {
  id: string;
  exercise_id: string;
  option_key: string; // "A", "B", "C", "D"
  option_text: string;
  is_correct: boolean;
}

export interface Exercise {
  id: string;
  lesson_id: string;
  question: string;
  type: ExerciseType;
  explanation: string;
  created_at: string;
  options: ExerciseOption[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  order_index: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  created_at: string;
  sections?: LessonSection[];
  vocabulary?: VocabularyItem[];
  exercises?: Exercise[];
  progress?: number;
  completed?: boolean;
}

export interface TestOption {
  id: string;
  question_id: string;
  option_key: string;
  option_text: string;
  is_correct: boolean;
}

export interface TestQuestion {
  id: string;
  test_id: string;
  question: string;
  order_index: number;
  explanation?: string;
  options: TestOption[];
}

export interface Test {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions_count?: number;
  questions?: TestQuestion[];
  best_score?: number;
  created_at: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  test_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_spent_seconds?: number;
  completed_at: string;
  test_title?: string;
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  progress_percentage: number;
  completed: boolean;
  updated_at: string;
  lesson_title?: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  vocabulary_id: string;
  created_at: string;
  vocabulary?: VocabularyItem;
}

export interface DashboardStats {
  overall_progress: number;
  completed_lessons: number;
  total_lessons: number;
  total_exercises: number;
  completed_exercises: number;
  average_test_score: number;
  tests_completed: number;
  vocabulary_learned: number;
  total_vocabulary: number;
  last_lesson?: {
    id: string;
    title: string;
    progress: number;
    order_index: number;
  };
  weekly_activity: {
    day: string; // 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'
    minutes: number;
    completed: number;
  }[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfileResponse;
}
