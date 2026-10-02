import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  LayoutDashboard
} from 'lucide-react';
import { testApi, TestSubmitResponse } from '../api/testApi.ts';
import { Test, TestQuestion } from '../../shared/types/index.ts';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { ProgressBar } from '../components/ui/ProgressBar.tsx';
import { LoadingState, ErrorState } from '../components/common/StateComponents.tsx';

export const TestTakePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedResult, setCompletedResult] = useState<TestSubmitResponse | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restore session in case of accidental browser refresh
  const storageKey = `english6_test_answers_${id}`;

  useEffect(() => {
    if (!id) return;

    const fetchTest = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await testApi.getById(id);
        if (res.success && res.data) {
          setTest(res.data);

          // Restore answers if available
          try {
            const saved = sessionStorage.getItem(storageKey);
            if (saved) {
              setAnswers(JSON.parse(saved));
            }
          } catch (e) {
            // ignore
          }
        } else {
          setError(res.message || 'Test topilmadi.');
        }
      } catch (e) {
        setError('Testni yuklashda xatolik yuz berdi.');
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, storageKey]);

  // Timer runner
  useEffect(() => {
    if (!completedResult && !loading && test) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [completedResult, loading, test]);

  // Persist answers
  const handleSelectOption = (questionId: string, optionKey: string) => {
    const updated = { ...answers, [questionId]: optionKey };
    setAnswers(updated);
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  };

  const handleFinishTest = async () => {
    if (!id || !test || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await testApi.submit(id, answers, secondsElapsed);
      if (res.success && res.data) {
        setCompletedResult(res.data);
        sessionStorage.removeItem(storageKey);
      } else {
        alert(res.message || 'Natijani saqlashda xatolik yuz berdi.');
      }
    } catch (e) {
      console.error('Submit test error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTryAgain = () => {
    setAnswers({});
    sessionStorage.removeItem(storageKey);
    setCompletedResult(null);
    setCurrentIndex(0);
    setSecondsElapsed(0);
  };

  if (loading) {
    return <LoadingState message="Test yuklanmoqda..." />;
  }

  if (error || !test) {
    return (
      <ErrorState
        title="Test topilmadi"
        message={error || 'Ushbu test mavjud emas.'}
        onRetry={() => navigate('/tests')}
      />
    );
  }

  const questions: TestQuestion[] = test.questions || [];
  const currentQuestion = questions[currentIndex];
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ---------------- RESULT VIEW ----------------
  if (completedResult) {
    const correctCount = completedResult.score;
    const wrongCount = completedResult.total - completedResult.score;

    return (
      <div className="max-w-xl mx-auto py-8 space-y-6 animate-in zoom-in-95 duration-200">
        <Card className="text-center p-8 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-1">
            Test yakunlandi!
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            {test.title} bo‘yicha natijangiz
          </p>

          <div className="p-6 bg-gray-50 dark:bg-neutral-800/60 rounded-2xl border border-gray-100 dark:border-neutral-800 mb-6">
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-1">
              {completedResult.percentage}%
            </div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {completedResult.score} / {completedResult.total} to‘g‘ri javob
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8 text-xs font-semibold">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex flex-col items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{correctCount} To‘g‘ri</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 flex flex-col items-center gap-1">
              <XCircle className="w-4 h-4" />
              <span>{wrongCount} Noto‘g‘ri</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 flex flex-col items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleTryAgain}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Qayta topshirish
            </Button>
            <Button
              className="flex-1"
              onClick={() => navigate('/')}
              icon={<LayoutDashboard className="w-4 h-4" />}
            >
              Bosh sahifaga
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------------- QUESTION VIEW ----------------
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Bar with Time & Progress */}
      <div className="flex items-center justify-between text-xs font-semibold">
        <button
          onClick={() => navigate('/tests')}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Chiqish
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl text-gray-700 dark:text-gray-300 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Vaqt: {formatTime(secondsElapsed)}</span>
        </div>
      </div>

      <Card className="p-6 md:p-8 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800">
        {/* Progress Bar & Counter */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
            <span>
              Savol {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} size="sm" />
        </div>

        {/* Question Text */}
        {currentQuestion ? (
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map(opt => {
                const isSelected = answers[currentQuestion.id] === opt.option_key;

                return (
                  <button
                    key={opt.id || opt.option_key}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, opt.option_key)}
                    className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-1 ring-blue-600'
                        : 'border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-gray-300 dark:hover:border-neutral-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {opt.option_key}
                    </span>
                    <span className="flex-1">{opt.option_text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-neutral-800">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Oldingisi
              </Button>

              {currentIndex < questions.length - 1 ? (
                <Button
                  size="sm"
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Keyingisi
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="primary"
                  loading={isSubmitting}
                  onClick={handleFinishTest}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Testni yakunlash
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Savollar mavjud emas.</p>
        )}
      </Card>
    </div>
  );
};
