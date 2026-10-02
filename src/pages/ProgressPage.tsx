import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  BookOpen,
  PenTool,
  CheckSquare,
  Languages,
  Calendar,
  Award
} from 'lucide-react';
import { progressApi } from '../api/progressApi.ts';
import { DashboardStats, Progress } from '../../shared/types/index.ts';
import { Card } from '../components/ui/Card.tsx';
import { ProgressBar } from '../components/ui/ProgressBar.tsx';
import { StatsCard } from '../components/common/StatsCard.tsx';
import { LoadingState, ErrorState } from '../components/common/StateComponents.tsx';

export const ProgressPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [progressList, setProgressList] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await progressApi.getProgress();
      if (res.success && res.data) {
        setStats(res.data.stats);
        setProgressList(res.data.progress);
      } else {
        setError(res.message || 'Progress ma’lumotlarini olib bo‘lmadi.');
      }
    } catch (e) {
      setError('Statistika serveriga ulanishda xatolik.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return <LoadingState message="Natijalar tahlili yuklanmoqda..." />;
  }

  if (error || !stats) {
    return <ErrorState message={error || 'Xatolik'} onRetry={fetchProgress} />;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Mening o‘quv natijalarim
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Ingliz tili bo‘yicha shaxsiy o‘sish ko‘rsatkichlari va o‘zlashtirish statistikasi
        </p>
      </div>

      {/* Main 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Darslar"
          value={`${stats.completed_lessons} / ${stats.total_lessons}`}
          subtitle={`${Math.round((stats.completed_lessons / stats.total_lessons) * 100)}% o‘zlashtirildi`}
          icon={<BookOpen className="w-5 h-5" />}
        />
        <StatsCard
          title="Mashqlar"
          value={`${stats.completed_exercises} / ${stats.total_exercises}`}
          subtitle="Muvaffaqiyatli yechildi"
          icon={<PenTool className="w-5 h-5" />}
        />
        <StatsCard
          title="O‘rtacha test bali"
          value={`${stats.average_test_score}%`}
          subtitle={`${stats.tests_completed} ta test natijasi`}
          icon={<CheckSquare className="w-5 h-5" />}
        />
        <StatsCard
          title="Lug‘at boyligi"
          value={`${stats.vocabulary_learned}`}
          subtitle="Faol yodlangan so‘zlar"
          icon={<Languages className="w-5 h-5" />}
        />
      </div>

      {/* Main Progress Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Umumiy darslik progressi
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
              {stats.overall_progress}% Tayyor
            </span>
          </div>

          <ProgressBar
            value={stats.overall_progress}
            size="lg"
            className="my-5"
          />

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Darslar nazorati</span>
                <span>{stats.completed_lessons} / {stats.total_lessons} dars</span>
              </div>
              <ProgressBar
                value={Math.round((stats.completed_lessons / stats.total_lessons) * 100)}
                size="sm"
                color="blue"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Mashqlar darajasi</span>
                <span>{stats.completed_exercises} / {stats.total_exercises} mashq</span>
              </div>
              <ProgressBar
                value={Math.round((stats.completed_exercises / stats.total_exercises) * 100)}
                size="sm"
                color="green"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                <span>Lug‘at o‘zlashtirilishi</span>
                <span>{stats.vocabulary_learned} / {stats.total_vocabulary} so‘z</span>
              </div>
              <ProgressBar
                value={Math.round((stats.vocabulary_learned / stats.total_vocabulary) * 100)}
                size="sm"
                color="amber"
              />
            </div>
          </div>
        </Card>

        {/* Weekly Activity Progress */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Haftalik grafik
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Har bir kun uchun sarflangan o‘quv vaqti (daqiqa)
            </p>

            <div className="flex items-end justify-between gap-2 h-36 pt-4">
              {stats.weekly_activity.map((item, idx) => {
                const maxM = 60;
                const h = Math.min(100, Math.round((item.minutes / maxM) * 100));
                const isHighlight = idx === 3;

                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg h-28 flex items-end justify-center p-1">
                      <div
                        className={`w-full rounded-md transition-all duration-300 ${
                          isHighlight ? 'bg-blue-600' : 'bg-blue-300 dark:bg-neutral-700'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            Davomiylik: 7 kun ketma-ket o‘qish
          </div>
        </Card>
      </div>

      {/* Individual Lesson Progress Table */}
      <Card className="p-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">
          Darslar bo‘yicha o‘zlashtirish ro‘yxati
        </h3>
        <div className="divide-y divide-gray-100 dark:divide-neutral-800">
          {progressList.map(prog => (
            <div key={prog.id} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {prog.lesson_title || 'Dars'}
                </p>
                <p className="text-xs text-gray-400">
                  Oxirgi marta: {new Date(prog.updated_at).toLocaleDateString('uz-UZ')}
                </p>
              </div>

              <div className="w-36 flex items-center gap-3">
                <ProgressBar
                  value={prog.progress_percentage}
                  size="sm"
                  color={prog.completed ? 'green' : 'blue'}
                  showValue
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
