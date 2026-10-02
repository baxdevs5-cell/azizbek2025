import React, { useEffect, useState } from 'react';
import { PenTool, CheckCircle, Award } from 'lucide-react';
import { exerciseApi } from '../api/exerciseApi.ts';
import { Exercise } from '../../shared/types/index.ts';
import { ExerciseCard } from '../components/common/ExerciseCard.tsx';
import { LoadingState, EmptyState, ErrorState } from '../components/common/StateComponents.tsx';
import { Card } from '../components/ui/Card.tsx';

export const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  const fetchExercises = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await exerciseApi.getAll();
      if (res.success && res.data) {
        setExercises(res.data);
      } else {
        setError(res.message || 'Mashqlarni yuklab bo‘lmadi.');
      }
    } catch (e) {
      setError('Mashqlar ma’lumotini olishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleExerciseSolved = (isCorrect: boolean) => {
    if (isCorrect) {
      setSolvedCount(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
            Amaliy grammatik mashqlar
          </h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Test va mashqlarni bajarib, bilimingizni mustahkamlang
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 px-4 py-2 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-xs self-start sm:self-auto">
          <Award className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">To‘g‘ri yechilgan</p>
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
              {solvedCount} / {exercises.length} ta mashq
            </p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="p-4 bg-blue-50/50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40 flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
          Har bir savol javobini belgilab "Tekshirish" tugmasini bosing. Sizga qaysi javob to‘g‘riligi va qoidasi batafsil tushuntiriladi.
        </div>
      </Card>

      {/* Exercises List */}
      {loading ? (
        <LoadingState message="Mashqlar yuklanmoqda..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchExercises} />
      ) : exercises.length === 0 ? (
        <EmptyState
          title="Mashqlar topilmadi"
          description="Hozircha hech qanday mashq mavjud emas."
          icon={<PenTool className="w-6 h-6" />}
        />
      ) : (
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              onAnswered={handleExerciseSolved}
            />
          ))}
        </div>
      )}
    </div>
  );
};
