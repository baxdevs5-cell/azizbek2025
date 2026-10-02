import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Trophy } from 'lucide-react';
import { testApi } from '../api/testApi.ts';
import { Test, TestResult } from '../../shared/types/index.ts';
import { TestCard } from '../components/common/TestCard.tsx';
import { Card } from '../components/ui/Card.tsx';
import { LoadingState, EmptyState, ErrorState } from '../components/common/StateComponents.tsx';

export const TestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [recentResults, setRecentResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestsAndResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const [testsRes, resultsRes] = await Promise.all([
        testApi.getAll(),
        testApi.getMyResults()
      ]);

      if (testsRes.success && testsRes.data) {
        setTests(testsRes.data);
      } else {
        setError(testsRes.message || 'Testlarni yuklab bo‘lmadi.');
      }

      if (resultsRes.success && resultsRes.data) {
        setRecentResults(resultsRes.data);
      }
    } catch (e) {
      setError('Testlarni yuklashda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestsAndResults();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
          Nazorat va sinov testlari
        </h2>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Bilimingizni sinash, ball to‘plash va o‘zlashtirishni tekshirish uchun maxsus testlar
        </p>
      </div>

      {loading ? (
        <LoadingState message="Testlar ro‘yxati yuklanmoqda..." />
      ) : error ? (
        <ErrorState message={error} onRetry={fetchTestsAndResults} />
      ) : tests.length === 0 ? (
        <EmptyState
          title="Testlar topilmadi"
          description="Hozircha faol testlar mavjud emas."
          icon={<CheckSquare className="w-6 h-6" />}
        />
      ) : (
        <>
          {/* Tests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tests.map(test => (
              <TestCard
                key={test.id}
                test={test}
                onStart={id => navigate(`/tests/${id}`)}
              />
            ))}
          </div>

          {/* Previous Results Section */}
          {recentResults.length > 0 && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  Oxirgi topshirilgan test natijalari
                </h3>
              </div>

              <Card className="p-0 overflow-hidden divide-y divide-gray-100 dark:divide-neutral-800">
                {recentResults.slice(0, 5).map(result => (
                  <div
                    key={result.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm hover:bg-gray-50/50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        {result.test_title || 'English Test'}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {new Date(result.completed_at).toLocaleDateString('uz-UZ', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="font-semibold text-gray-600 dark:text-gray-300">
                        {result.score} / {result.total_questions} ta to‘g‘ri
                      </span>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                        result.percentage >= 80
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : result.percentage >= 60
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}>
                        {result.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};
