import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Languages,
  PenTool,
  CheckCircle,
  Sparkles,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { lessonApi } from '../api/lessonApi.ts';
import { progressApi } from '../api/progressApi.ts';
import { Lesson } from '../../shared/types/index.ts';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { ProgressBar } from '../components/ui/ProgressBar.tsx';
import { VocabularyCard } from '../components/common/VocabularyCard.tsx';
import { ExerciseCard } from '../components/common/ExerciseCard.tsx';
import { LoadingState, ErrorState } from '../components/common/StateComponents.tsx';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'grammar' | 'vocabulary' | 'practice'>('grammar');
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchLesson = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await lessonApi.getById(id);
        if (res.success && res.data) {
          setLesson(res.data);
          setCurrentProgress(res.data.progress || 0);
        } else {
          setError(res.message || 'Dars topilmadi.');
        }
      } catch (e) {
        setError('Dars ma’lumotlarini yuklashda xatolik.');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  const handleCompleteLesson = async () => {
    if (!id || isUpdatingProgress) return;
    setIsUpdatingProgress(true);
    try {
      const res = await progressApi.updateProgress(id, 100);
      if (res.success) {
        setCurrentProgress(100);
      }
    } catch (e) {
      console.error('Error saving progress:', e);
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  if (loading) {
    return <LoadingState message="Dars ma’lumotlari yuklanmoqda..." />;
  }

  if (error || !lesson) {
    return (
      <ErrorState
        title="Dars topilmadi"
        message={error || 'Ushbu dars mavjud emas.'}
        onRetry={() => navigate('/lessons')}
      />
    );
  }

  const isCompleted = currentProgress >= 100;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <button
          onClick={() => navigate('/lessons')}
          className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Darslar ro‘yxati
        </button>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-bold truncate">
          Lesson {lesson.order_index}: {lesson.title}
        </span>
      </div>

      {/* Hero Header Card */}
      <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Lesson {lesson.order_index}
              </span>
              <Badge variant="blue" size="sm">
                6-sinf
              </Badge>
              <Badge
                variant={lesson.difficulty === 'Easy' ? 'green' : lesson.difficulty === 'Medium' ? 'blue' : 'amber'}
                size="sm"
              >
                {lesson.difficulty === 'Easy' ? 'Oson' : lesson.difficulty === 'Medium' ? 'O‘rta' : 'Murakkab'}
              </Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {lesson.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Action button */}
          <div className="shrink-0 flex items-center gap-3">
            {isCompleted ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold border border-emerald-200 dark:border-emerald-900">
                <CheckCircle className="w-4 h-4" /> Dars to‘liq o‘zlashtirildi
              </span>
            ) : (
              <Button
                size="sm"
                onClick={handleCompleteLesson}
                loading={isUpdatingProgress}
                icon={<CheckCircle2 className="w-4 h-4" />}
              >
                Darsni yakunlash
              </Button>
            )}
          </div>
        </div>

        {/* Progress bar in header */}
        <ProgressBar
          value={currentProgress}
          label="Dars bo‘yicha sizning natijangiz"
          showValue
          size="md"
          color={isCompleted ? 'green' : 'blue'}
        />
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-neutral-800 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'grammar'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Grammatika va qoidalar
        </button>
        <button
          onClick={() => setActiveTab('vocabulary')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'vocabulary'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Languages className="w-4 h-4" />
          Mavzuga oid lug‘at ({lesson.vocabulary?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={`pb-3 px-4 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'practice'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <PenTool className="w-4 h-4" />
          Amaliy mashqlar ({lesson.exercises?.length || 0})
        </button>
      </div>

      {/* TAB CONTENT: Grammar */}
      {activeTab === 'grammar' && (
        <div className="space-y-6">
          {(lesson.sections || []).length > 0 ? (
            lesson.sections?.map(section => (
              <Card key={section.id} className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                </div>
                <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans whitespace-pre-line bg-gray-50/60 dark:bg-neutral-800/40 p-4 md:p-6 rounded-2xl border border-gray-100 dark:border-neutral-800">
                  {section.content}
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center text-gray-400">
              Grammatika bo‘limi tayyorlanmoqda.
            </Card>
          )}

          {/* Quick next step footer */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl">
            <span className="text-xs text-gray-500">Qoidalarni o‘qib bo‘ldingizmi?</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveTab('vocabulary')}
              icon={<Languages className="w-4 h-4" />}
            >
              Lug‘atga o‘tish
            </Button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Vocabulary */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-6">
          {(lesson.vocabulary || []).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lesson.vocabulary?.map(voc => (
                <VocabularyCard key={voc.id} item={voc} />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-400">
              Ushbu dars uchun maxsus yangi so‘zlar kiritilmagan.
            </Card>
          )}

          <div className="flex justify-between items-center p-4 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl">
            <span className="text-xs text-gray-500">So‘zlarni talaffuz qilib ko‘rdingizmi?</span>
            <Button
              size="sm"
              onClick={() => setActiveTab('practice')}
              icon={<PenTool className="w-4 h-4" />}
            >
              Mashqlarni bajarish
            </Button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Practice Exercises */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/40 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900 dark:text-blue-200">
              Mavzuni mustahkamlash uchun quyidagi mashqlarni yeching. Har bir savolga javob bergach, tizim to‘g‘ri javob va grammatik izohni ko‘rsatadi.
            </p>
          </div>

          {(lesson.exercises || []).length > 0 ? (
            <div className="space-y-4">
              {lesson.exercises?.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  onAnswered={() => {
                    // Update progress slightly on answer
                    if (currentProgress < 75) {
                      setCurrentProgress(75);
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-400">
              Ushbu dars uchun hozircha mashqlar mavjud emas.
            </Card>
          )}

          <div className="p-6 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Darsni muvaffaqiyatli yakunladingizmi?
              </h4>
              <p className="text-xs text-gray-500">
                "Darsni yakunlash" tugmasini bosing va keyingi mavzuga o‘ting.
              </p>
            </div>
            <Button
              size="md"
              onClick={handleCompleteLesson}
              loading={isUpdatingProgress}
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Darsni yakunlash (100%)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
