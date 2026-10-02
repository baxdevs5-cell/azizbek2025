import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  User,
  Lesson,
  LessonSection,
  VocabularyItem,
  Exercise,
  ExerciseOption,
  Test,
  TestQuestion,
  TestOption,
  TestResult,
  Progress,
  Favorite,
  DashboardStats
} from '@/shared/types/index.ts';
import {
  initialLessons,
  initialSections,
  initialVocabulary,
  initialExercises,
  initialTests,
  initialTestQuestions
} from './seedData.ts';

export interface DatabaseSchema {
  users: User[];
  lessons: Lesson[];
  lesson_sections: LessonSection[];
  vocabulary: VocabularyItem[];
  exercises: Exercise[];
  exercise_options: ExerciseOption[];
  tests: Test[];
  test_questions: TestQuestion[];
  test_options: TestOption[];
  test_results: TestResult[];
  progress: Progress[];
  favorites: Favorite[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'english6_db.json');

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.error('Error reading database file, resetting to seed:', err);
    }

    return this.initializeSeed();
  }

  private initializeSeed(): DatabaseSchema {
    const salt = bcrypt.genSaltSync(10);
    const adminPasswordHash = bcrypt.hashSync('admin123', salt);
    const teacherPasswordHash = bcrypt.hashSync('teacher123', salt);
    const studentPasswordHash = bcrypt.hashSync('student123', salt);

    const users: User[] = [
      {
        id: 'user-admin',
        full_name: 'Administrator',
        email: 'admin@english6.uz',
        password_hash: adminPasswordHash,
        grade: 'O‘qituvchi',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user-teacher',
        full_name: 'Nodira Karimova',
        email: 'teacher@english6.uz',
        password_hash: teacherPasswordHash,
        grade: 'O‘qituvchi',
        role: 'teacher',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'user-student',
        full_name: 'Jasur Alimov',
        email: 'student@english6.uz',
        password_hash: studentPasswordHash,
        grade: '6-A sinf',
        role: 'student',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // Build normalized questions and options
    const flatQuestions: TestQuestion[] = [];
    const flatTestOptions: TestOption[] = [];
    for (const testId of Object.keys(initialTestQuestions)) {
      for (const q of initialTestQuestions[testId]) {
        flatQuestions.push(q);
        if (q.options) {
          flatTestOptions.push(...q.options);
        }
      }
    }

    // Build normalized exercise options
    const flatExerciseOptions: ExerciseOption[] = [];
    for (const ex of initialExercises) {
      if (ex.options) {
        flatExerciseOptions.push(...ex.options);
      }
    }

    // Initial student progress
    const progress: Progress[] = [
      {
        id: 'prog-1',
        user_id: 'user-student',
        lesson_id: 'lesson-1',
        progress_percentage: 100,
        completed: true,
        updated_at: new Date().toISOString(),
        lesson_title: 'Personal Information'
      },
      {
        id: 'prog-2',
        user_id: 'user-student',
        lesson_id: 'lesson-2',
        progress_percentage: 100,
        completed: true,
        updated_at: new Date().toISOString(),
        lesson_title: 'Family and Friends'
      },
      {
        id: 'prog-3',
        user_id: 'user-student',
        lesson_id: 'lesson-3',
        progress_percentage: 100,
        completed: true,
        updated_at: new Date().toISOString(),
        lesson_title: 'Daily Routines'
      },
      {
        id: 'prog-4',
        user_id: 'user-student',
        lesson_id: 'lesson-4',
        progress_percentage: 65,
        completed: false,
        updated_at: new Date().toISOString(),
        lesson_title: 'Present Simple'
      }
    ];

    const test_results: TestResult[] = [
      {
        id: 'tr-1',
        user_id: 'user-student',
        test_id: 'test-1',
        score: 5,
        total_questions: 5,
        percentage: 100,
        time_spent_seconds: 180,
        completed_at: new Date().toISOString(),
        test_title: 'Unit 1-3 Review: Personal Info & Daily Life'
      },
      {
        id: 'tr-2',
        user_id: 'user-student',
        test_id: 'test-2',
        score: 4,
        total_questions: 5,
        percentage: 80,
        time_spent_seconds: 220,
        completed_at: new Date().toISOString(),
        test_title: 'Grammar Master: Present Simple vs Continuous'
      }
    ];

    const favorites: Favorite[] = [
      {
        id: 'fav-1',
        user_id: 'user-student',
        vocabulary_id: 'voc-1',
        created_at: new Date().toISOString()
      },
      {
        id: 'fav-2',
        user_id: 'user-student',
        vocabulary_id: 'voc-11',
        created_at: new Date().toISOString()
      }
    ];

    const initialData: DatabaseSchema = {
      users,
      lessons: initialLessons,
      lesson_sections: initialSections,
      vocabulary: initialVocabulary,
      exercises: initialExercises,
      exercise_options: flatExerciseOptions,
      tests: initialTests,
      test_questions: flatQuestions,
      test_options: flatTestOptions,
      test_results,
      progress,
      favorites
    };

    this.saveData(initialData);
    return initialData;
  }

  private saveData(data: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      this.data = data;
    } catch (err) {
      console.error('Error saving database:', err);
    }
  }

  // --- Users Table Operations ---
  public findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.saveData(this.data);
    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = {
      ...this.data.users[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    this.saveData(this.data);
    return this.data.users[index];
  }

  public getAllUsers(): User[] {
    return this.data.users.map(({ password_hash: _, ...rest }) => rest as User);
  }

  public deleteUser(id: string): boolean {
    const initialLen = this.data.users.length;
    this.data.users = this.data.users.filter(u => u.id !== id);
    if (this.data.users.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Lessons Table Operations ---
  public getLessons(userId?: string): Lesson[] {
    const userProgress = userId
      ? this.data.progress.filter(p => p.user_id === userId)
      : [];

    return this.data.lessons
      .sort((a, b) => a.order_index - b.order_index)
      .map(lesson => {
        const prog = userProgress.find(p => p.lesson_id === lesson.id);
        return {
          ...lesson,
          progress: prog ? prog.progress_percentage : 0,
          completed: prog ? prog.completed : false
        };
      });
  }

  public getLessonById(id: string, userId?: string): Lesson | null {
    const lesson = this.data.lessons.find(l => l.id === id);
    if (!lesson) return null;

    const sections = this.data.lesson_sections
      .filter(s => s.lesson_id === id)
      .sort((a, b) => a.order_index - b.order_index);

    const vocabulary = this.getVocabularyByLesson(id, userId);

    const exercises = this.data.exercises
      .filter(e => e.lesson_id === id)
      .map(e => ({
        ...e,
        options: this.data.exercise_options.filter(opt => opt.exercise_id === e.id)
      }));

    const userProg = userId
      ? this.data.progress.find(p => p.user_id === userId && p.lesson_id === id)
      : undefined;

    return {
      ...lesson,
      sections,
      vocabulary,
      exercises,
      progress: userProg?.progress_percentage ?? 0,
      completed: userProg?.completed ?? false
    };
  }

  public createLesson(lesson: Omit<Lesson, 'id' | 'created_at'>): Lesson {
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.lessons.push(newLesson);
    this.saveData(this.data);
    return newLesson;
  }

  public updateLesson(id: string, updates: Partial<Lesson>): Lesson | null {
    const index = this.data.lessons.findIndex(l => l.id === id);
    if (index === -1) return null;
    this.data.lessons[index] = { ...this.data.lessons[index], ...updates };
    this.saveData(this.data);
    return this.data.lessons[index];
  }

  public deleteLesson(id: string): boolean {
    const initialLen = this.data.lessons.length;
    this.data.lessons = this.data.lessons.filter(l => l.id !== id);
    this.data.lesson_sections = this.data.lesson_sections.filter(s => s.lesson_id !== id);
    this.data.exercises = this.data.exercises.filter(e => e.lesson_id !== id);
    if (this.data.lessons.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Vocabulary Table Operations ---
  public getVocabulary(category?: string, search?: string, userId?: string): VocabularyItem[] {
    let items = [...this.data.vocabulary];

    if (category && category !== 'All') {
      items = items.filter(v => v.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(v =>
        v.word.toLowerCase().includes(q) ||
        v.translation.toLowerCase().includes(q) ||
        v.example.toLowerCase().includes(q)
      );
    }

    const userFavs = userId
      ? new Set(this.data.favorites.filter(f => f.user_id === userId).map(f => f.vocabulary_id))
      : new Set();

    return items.map(v => ({
      ...v,
      is_favorite: userFavs.has(v.id)
    }));
  }

  public getVocabularyByLesson(lessonId: string, userId?: string): VocabularyItem[] {
    const userFavs = userId
      ? new Set(this.data.favorites.filter(f => f.user_id === userId).map(f => f.vocabulary_id))
      : new Set();

    return this.data.vocabulary
      .filter(v => v.lesson_id === lessonId)
      .map(v => ({
        ...v,
        is_favorite: userFavs.has(v.id)
      }));
  }

  public getVocabularyById(id: string, userId?: string): VocabularyItem | null {
    const item = this.data.vocabulary.find(v => v.id === id);
    if (!item) return null;
    const isFav = userId
      ? this.data.favorites.some(f => f.user_id === userId && f.vocabulary_id === id)
      : false;
    return { ...item, is_favorite: isFav };
  }

  public createVocabulary(item: Omit<VocabularyItem, 'id' | 'created_at'>): VocabularyItem {
    const newItem: VocabularyItem = {
      ...item,
      id: `voc-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    this.data.vocabulary.push(newItem);
    this.saveData(this.data);
    return newItem;
  }

  public updateVocabulary(id: string, updates: Partial<VocabularyItem>): VocabularyItem | null {
    const index = this.data.vocabulary.findIndex(v => v.id === id);
    if (index === -1) return null;
    this.data.vocabulary[index] = { ...this.data.vocabulary[index], ...updates };
    this.saveData(this.data);
    return this.data.vocabulary[index];
  }

  public deleteVocabulary(id: string): boolean {
    const initialLen = this.data.vocabulary.length;
    this.data.vocabulary = this.data.vocabulary.filter(v => v.id !== id);
    this.data.favorites = this.data.favorites.filter(f => f.vocabulary_id !== id);
    if (this.data.vocabulary.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Exercises Table Operations ---
  public getExercises(lessonId?: string): Exercise[] {
    let items = [...this.data.exercises];
    if (lessonId) {
      items = items.filter(e => e.lesson_id === lessonId);
    }
    return items.map(e => ({
      ...e,
      options: this.data.exercise_options.filter(opt => opt.exercise_id === e.id)
    }));
  }

  public getExerciseById(id: string): Exercise | null {
    const ex = this.data.exercises.find(e => e.id === id);
    if (!ex) return null;
    return {
      ...ex,
      options: this.data.exercise_options.filter(opt => opt.exercise_id === ex.id)
    };
  }

  public checkExerciseAnswer(exerciseId: string, selectedOptionKey: string) {
    const ex = this.getExerciseById(exerciseId);
    if (!ex) return null;
    const correctOpt = ex.options.find((opt: ExerciseOption) => opt.is_correct);
    const isCorrect = correctOpt ? correctOpt.option_key === selectedOptionKey : false;
    return {
      is_correct: isCorrect,
      correct_option_key: correctOpt?.option_key,
      explanation: ex.explanation
    };
  }

  // --- Tests Table Operations ---
  public getTests(userId?: string): Test[] {
    const userResults = userId
      ? this.data.test_results.filter(r => r.user_id === userId)
      : [];

    return this.data.tests.map(t => {
      const results = userResults.filter(r => r.test_id === t.id);
      const best = results.length > 0
        ? Math.max(...results.map(r => r.percentage))
        : undefined;

      const questions = this.data.test_questions.filter(q => q.test_id === t.id);

      return {
        ...t,
        questions_count: questions.length,
        best_score: best
      };
    });
  }

  public getTestById(id: string, userId?: string): Test | null {
    const test = this.data.tests.find(t => t.id === id);
    if (!test) return null;

    const questions = this.data.test_questions
      .filter(q => q.test_id === id)
      .sort((a, b) => a.order_index - b.order_index)
      .map(q => ({
        ...q,
        options: this.data.test_options.filter(opt => opt.question_id === q.id)
      }));

    const userResults = userId
      ? this.data.test_results.filter(r => r.user_id === userId && r.test_id === id)
      : [];
    const best = userResults.length > 0 ? Math.max(...userResults.map(r => r.percentage)) : undefined;

    return {
      ...test,
      questions_count: questions.length,
      questions,
      best_score: best
    };
  }

  public submitTestResult(
    userId: string,
    testId: string,
    answers: Record<string, string>,
    timeSpentSeconds?: number
  ): {
    score: number;
    total: number;
    percentage: number;
    results: { question_id: string; is_correct: boolean; correct_key: string }[];
  } | null {
    const test = this.data.tests.find(t => t.id === testId);
    if (!test) return null;

    const questions = this.data.test_questions.filter(q => q.test_id === testId);
    let correctCount = 0;
    const itemResults: { question_id: string; is_correct: boolean; correct_key: string }[] = [];

    for (const q of questions) {
      const options = this.data.test_options.filter(opt => opt.question_id === q.id);
      const correctOpt = options.find(o => o.is_correct);
      const userSelected = answers[q.id];
      const isCorrect = correctOpt ? correctOpt.option_key === userSelected : false;

      if (isCorrect) correctCount++;
      itemResults.push({
        question_id: q.id,
        is_correct: isCorrect,
        correct_key: correctOpt?.option_key || ''
      });
    }

    const percentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

    const result: TestResult = {
      id: `tr-${Date.now()}`,
      user_id: userId,
      test_id: testId,
      score: correctCount,
      total_questions: questions.length,
      percentage,
      time_spent_seconds: timeSpentSeconds || 0,
      completed_at: new Date().toISOString(),
      test_title: test.title
    };

    this.data.test_results.push(result);
    this.saveData(this.data);

    return {
      score: correctCount,
      total: questions.length,
      percentage,
      results: itemResults
    };
  }

  public getTestResultsByUser(userId: string): TestResult[] {
    return this.data.test_results
      .filter(r => r.user_id === userId)
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  }

  // --- Progress Operations ---
  public getProgressByUser(userId: string): Progress[] {
    return this.data.progress.filter(p => p.user_id === userId);
  }

  public updateLessonProgress(userId: string, lessonId: string, percentage: number): Progress {
    const lesson = this.data.lessons.find(l => l.id === lessonId);
    const existingIndex = this.data.progress.findIndex(
      p => p.user_id === userId && p.lesson_id === lessonId
    );

    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    const completed = clampedPercentage >= 100;

    if (existingIndex >= 0) {
      this.data.progress[existingIndex] = {
        ...this.data.progress[existingIndex],
        progress_percentage: Math.max(this.data.progress[existingIndex].progress_percentage, clampedPercentage),
        completed: this.data.progress[existingIndex].completed || completed,
        updated_at: new Date().toISOString(),
        lesson_title: lesson?.title || this.data.progress[existingIndex].lesson_title
      };
      this.saveData(this.data);
      return this.data.progress[existingIndex];
    } else {
      const newProg: Progress = {
        id: `prog-${Date.now()}`,
        user_id: userId,
        lesson_id: lessonId,
        progress_percentage: clampedPercentage,
        completed,
        updated_at: new Date().toISOString(),
        lesson_title: lesson?.title || 'Lesson'
      };
      this.data.progress.push(newProg);
      this.saveData(this.data);
      return newProg;
    }
  }

  public getDashboardStats(userId: string): DashboardStats {
    const userProgress = this.data.progress.filter(p => p.user_id === userId);
    const completedLessons = userProgress.filter(p => p.completed).length;
    const totalLessons = this.data.lessons.length;

    const userResults = this.data.test_results.filter(r => r.user_id === userId);
    const avgScore = userResults.length > 0
      ? Math.round(userResults.reduce((sum, r) => sum + r.percentage, 0) / userResults.length)
      : 0;

    const totalVocabulary = this.data.vocabulary.length;
    // Estimate vocabulary learned based on progress
    const vocabLearned = Math.min(
      totalVocabulary,
      Math.round((completedLessons / Math.max(1, totalLessons)) * totalVocabulary) +
      this.data.favorites.filter(f => f.user_id === userId).length * 2
    );

    const totalExercises = this.data.exercises.length;
    const completedExercises = Math.min(totalExercises, completedLessons * 3 + 2);

    // Calculate overall percentage
    const overallProgress = totalLessons > 0
      ? Math.min(100, Math.round((completedLessons / totalLessons) * 70 + (userResults.length > 0 ? (avgScore * 0.3) : 0)))
      : 0;

    // Last studied lesson
    let lastLesson: DashboardStats['last_lesson'] | undefined;
    if (userProgress.length > 0) {
      const sorted = [...userProgress].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
      const l = this.data.lessons.find(less => less.id === sorted[0].lesson_id);
      if (l) {
        lastLesson = {
          id: l.id,
          title: l.title,
          progress: sorted[0].progress_percentage,
          order_index: l.order_index
        };
      }
    } else if (this.data.lessons.length > 0) {
      lastLesson = {
        id: this.data.lessons[0].id,
        title: this.data.lessons[0].title,
        progress: 0,
        order_index: this.data.lessons[0].order_index
      };
    }

    // Weekly activity data
    const weekly_activity = [
      { day: 'Dush', minutes: 25, completed: 1 },
      { day: 'Sesh', minutes: 40, completed: 2 },
      { day: 'Chor', minutes: 30, completed: 1 },
      { day: 'Pay', minutes: 45, completed: 2 },
      { day: 'Juma', minutes: 20, completed: 1 },
      { day: 'Shan', minutes: 60, completed: 3 },
      { day: 'Yak', minutes: 35, completed: 1 }
    ];

    return {
      overall_progress: overallProgress,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
      total_exercises: totalExercises,
      completed_exercises: completedExercises,
      average_test_score: avgScore,
      tests_completed: userResults.length,
      vocabulary_learned: vocabLearned,
      total_vocabulary: totalVocabulary,
      last_lesson: lastLesson,
      weekly_activity
    };
  }

  // --- Favorites Table Operations ---
  public getFavoritesByUser(userId: string): Favorite[] {
    const userFavs = this.data.favorites.filter(f => f.user_id === userId);
    return userFavs.map(f => ({
      ...f,
      vocabulary: this.data.vocabulary.find(v => v.id === f.vocabulary_id)
    }));
  }

  public addFavorite(userId: string, vocabularyId: string): Favorite | null {
    const existing = this.data.favorites.find(
      f => f.user_id === userId && f.vocabulary_id === vocabularyId
    );
    if (existing) return existing;

    const voc = this.data.vocabulary.find(v => v.id === vocabularyId);
    if (!voc) return null;

    const newFav: Favorite = {
      id: `fav-${Date.now()}`,
      user_id: userId,
      vocabulary_id: vocabularyId,
      created_at: new Date().toISOString()
    };
    this.data.favorites.push(newFav);
    this.saveData(this.data);
    return { ...newFav, vocabulary: voc };
  }

  public removeFavorite(userId: string, vocabularyId: string): boolean {
    const initialLen = this.data.favorites.length;
    this.data.favorites = this.data.favorites.filter(
      f => !(f.user_id === userId && f.vocabulary_id === vocabularyId)
    );
    if (this.data.favorites.length !== initialLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }
}

export const db = new Database();
