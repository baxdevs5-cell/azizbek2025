import React from 'react';
import { Clock, HelpCircle, Trophy, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Button } from '../ui/Button.tsx';
import { Test } from '@/shared/types/index.ts';

interface TestCardProps {
  test: Test;
  onStart: (id: string) => void;
}

const difficultyVariantMap: Record<string, 'green' | 'blue' | 'amber'> = {
  Easy: 'green',
  Medium: 'blue',
  Hard: 'amber'
};

export const TestCard: React.FC<TestCardProps> = ({ test, onStart }) => {
  const difficultyVariant = difficultyVariantMap[test.difficulty] || 'blue';

  return (
    <Card hoverable className="flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={difficultyVariant} size="sm">
            {test.difficulty === 'Easy' ? 'Oson' : test.difficulty === 'Medium' ? 'O‘rta' : 'Murakkab'}
          </Badge>
          {test.best_score !== undefined && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Natija: {test.best_score}%
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug">
          {test.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {test.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-5">
          <span className="flex items-center gap-1.5 font-medium">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            {test.questions_count || 5} ta savol
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-amber-500" />
            {test.duration_minutes} daqiqa
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-neutral-800">
        <Button
          className="w-full"
          size="sm"
          onClick={() => onStart(test.id)}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          {test.best_score !== undefined ? 'Qayta topshirish' : 'Testni boshlash'}
        </Button>
      </div>
    </Card>
  );
};
