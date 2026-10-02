import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessonApi } from '../api/lessonApi.ts';
import { Lesson } from '../../shared/types/index.ts';
import { LessonCard } from '../components/common/LessonCard.tsx';
import { LoadingState, EmptyState, ErrorState } from '../components/common/StateComponents.tsx';
import { BookOpen } from 'lucide-react';

export const LessonsPage: React.FC = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');

  const fetchLessons = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await lessonApi.getAll();
      if (res.success && res.data) {
        setLessons(res.data);
      } else {
        setError(res.message || 'Darslarni yuklab bo‘lmadi.');
      }
    } catch (e) {
      setError('Server bilan bog‘lanishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const filteredLessons = lessons.filter(l => {
    if (filterDifficulty === 'All') return true;
    return l.difficulty === filterDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            6-sinf Ingliz tili darslari
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Darslik asosida tuzilgan 12 ta asosiy unit va grammatik mavzular
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl self-start sm:self-auto">
          {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterDifficulty === diff
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {diff === 'All' ? 'Barchasi' : diff === 'Easy' ? 'Oson' : diff === 'Medium' ? 'O‘rta' : 'Murakkab'}
            </button>
          ))}
        </div>
      </div>

      {/* Content State */}
      {loading ? (
        <LoadingState message="Darslar ro‘yxati yuklanmoqda..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchLessons} />
      ) : filteredLessons.length === 0 ? (
        <EmptyState
          title="Darslar topilmadi"
          description="Tanlangan qiyinlik darajasiga mos dars topilmadi."
          icon={<BookOpen className="w-6 h-6" />}
          actionText="Barcha darslarni ko‘rsatish"
          onAction={() => setFilterDifficulty('All')}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onSelect={id => navigate(`/lessons/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
