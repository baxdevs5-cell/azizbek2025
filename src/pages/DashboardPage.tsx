import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  PenTool,
  CheckSquare,
  Languages,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Trophy,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { progressApi } from '../api/progressApi.ts';
import { DashboardStats } from '../../shared/types/index.ts';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { ProgressBar } from '../components/ui/ProgressBar.tsx';
import { StatsCard } from '../components/common/StatsCard.tsx';
import { LoadingState } from '../components/common/StateComponents.tsx';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await progressApi.getProgress();
        if (res.success && res.data) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <LoadingState message="Boshqaruv paneli yuklanmoqda..." />;
  }

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'O‘quvchi';

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* Welcome Card & Continue Learning Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-blue-500/10">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold tracking-wide text-white mb-4">
              <Sparkles className="w-3.5 h-3.5" /> 6-sinf Davlat Ta’lim Standarti
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Salom, {firstName}! 👋
            </h2>
            <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed mb-6">
              Bugun ingliz tilini o‘rganishga tayyormisan? Yangi grammatika, so‘zlar va qiziqarli mashqlar seni kutmoqda!
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
              onClick={() => navigate('/lessons')}
              icon={<BookOpen className="w-4 h-4" />}
            >
              Darslarga o‘tish
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="text-white hover:bg-white/10 border border-white/20"
              onClick={() => navigate('/vocabulary')}
              icon={<Languages className="w-4 h-4" />}
            >
              Lug‘atni mashq qilish
            </Button>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-32 h-32 rounded-full bg-blue-400/20 blur-lg pointer-events-none" />
        </Card>

        {/* Continue Learning Card */}
        <Card className="flex flex-col justify-between p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Davom ettirish
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                Oxirgi dars
              </span>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
              Lesson {stats?.last_lesson?.order_index || 1}: {stats?.last_lesson?.title || 'Personal Information'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Oldingi mashg‘ulot to‘xtatilgan joyidan davom eting.
            </p>

            <ProgressBar
              value={stats?.last_lesson?.progress || 0}
              label="O‘zlashtirish darajasi"
              showValue
              size="sm"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800">
            <Button
              className="w-full"
              size="sm"
              onClick={() => navigate(`/lessons/${stats?.last_lesson?.id || 'lesson-1'}`)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Davom ettirish
            </Button>
          </div>
        </Card>
      </div>

      {/* Overview 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Darslar"
          value={`${stats?.completed_lessons || 0} / ${stats?.total_lessons || 12}`}
          subtitle="Tugatilgan darslar"
          icon={<BookOpen className="w-5 h-5" />}
        />
        <StatsCard
          title="Mashqlar"
          value={`${stats?.completed_exercises || 0} / ${stats?.total_exercises || 48}`}
          subtitle="Bajarilgan mashqlar"
          icon={<PenTool className="w-5 h-5" />}
        />
        <StatsCard
          title="Test natijasi"
          value={`${stats?.average_test_score || 0}%`}
          subtitle={`${stats?.tests_completed || 0} ta test topshirildi`}
          icon={<CheckSquare className="w-5 h-5" />}
        />
        <StatsCard
          title="Yodlangan so‘zlar"
          value={`${stats?.vocabulary_learned || 0}`}
          subtitle="Lug‘at boyligi"
          icon={<Languages className="w-5 h-5" />}
        />
      </div>

      {/* Progress & Weekly Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress Progress Card */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Umumiy o‘zlashtirish darajasi
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Darslar, testlar va mashqlar umumiy ko‘rsatkichi
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              {stats?.overall_progress || 0}% tayyor
            </div>
          </div>

          <ProgressBar
            value={stats?.overall_progress || 0}
            size="lg"
            className="my-4"
          />

          {/* Breakdown bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-neutral-800">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Darslar hajmi</span>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {Math.round(((stats?.completed_lessons || 0) / (stats?.total_lessons || 12)) * 100)}% yakunlandi
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Test ko‘rsatkichi</span>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {stats?.average_test_score || 0}% o‘rtacha ball
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Lug‘at foizi</span>
              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {Math.round(((stats?.vocabulary_learned || 0) / (stats?.total_vocabulary || 120)) * 100)}% o‘rganildi
              </p>
            </div>
          </div>
        </Card>

        {/* Weekly Activity Tracker */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Haftalik faollik
              </h3>
              <Target className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Kunlik o‘qish daqiqalari va mashqlar soni
            </p>

            <div className="flex items-end justify-between gap-2 h-32 pt-4">
              {(stats?.weekly_activity || []).map((item, idx) => {
                const maxMins = 60;
                const heightPercent = Math.min(100, Math.round((item.minutes / maxMins) * 100));
                const isToday = idx === 3; // Pay

                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-gray-100 dark:bg-neutral-800 rounded-lg h-24 flex items-end justify-center p-1 relative">
                      <div
                        className={`w-full rounded-md transition-all duration-300 ${
                          isToday
                            ? 'bg-blue-600'
                            : 'bg-blue-200 dark:bg-neutral-700 group-hover:bg-blue-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="opacity-0 group-hover:opacity-100 absolute -top-7 text-[10px] font-bold bg-gray-900 text-white dark:bg-white dark:text-neutral-900 px-1.5 py-0.5 rounded shadow transition-opacity pointer-events-none whitespace-nowrap">
                        {item.minutes} daq
                      </span>
                    </div>
                    <span className={`text-[11px] font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between text-xs text-gray-500">
            <span>Haftalik maqsad: 180 daqiqa</span>
            <span className="font-semibold text-emerald-600">Bajarildi (245 daqiqa)</span>
          </div>
        </Card>
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              Bilimingizni sinab ko‘ring!
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Grammatika va lug‘at bo‘yicha 20 talik sinov testini ishlang va sertifikat oling.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="shrink-0"
          onClick={() => navigate('/tests')}
          icon={<CheckSquare className="w-4 h-4" />}
        >
          Testlarga o‘tish
        </Button>
      </div>
    </div>
  );
};
