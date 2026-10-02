import React from 'react';
import { BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import { Badge } from '../ui/Badge.tsx';
import { ProgressBar } from '../ui/ProgressBar.tsx';
import { Lesson } from '@/shared/types/index.ts';

interface LessonCardProps {
  lesson: Lesson;
  onSelect: (id: string) => void;
}

const difficultyVariantMap: Record<string, 'green' | 'blue' | 'amber'> = {
  Easy: 'green',
  Medium: 'blue',
  Hard: 'amber'
};

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onSelect }) => {
  const difficultyVariant = difficultyVariantMap[lesson.difficulty] || 'blue';

  const isCompleted = lesson.completed || (lesson.progress !== undefined && lesson.progress >= 100);

  return (
    <Card
      hoverable
      onClick={() => onSelect(lesson.id)}
      className="cursor-pointer group flex flex-col justify-between transition-all duration-200"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-neutral-800 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center">
              #{lesson.order_index}
            </span>
            <Badge variant={difficultyVariant} size="sm">
              {lesson.difficulty === 'Easy' ? 'Oson' : lesson.difficulty === 'Medium' ? 'O‘rta' : 'Murakkab'}
            </Badge>
          </div>
          {isCompleted && (
            <span className="flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 gap-1">
              <CheckCircle className="w-4 h-4" /> Bajarildi
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1.5">
          {lesson.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {lesson.description}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-100 dark:border-neutral-800/80">
        <ProgressBar
          value={lesson.progress || 0}
          size="sm"
          color={isCompleted ? 'green' : 'blue'}
          showValue
          label="O‘zlashtirish"
        />
        <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {isCompleted ? 'Qayta ko‘rish' : (lesson.progress && lesson.progress > 0) ? 'Davom ettirish' : 'Boshlash'}
          </span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Card>
  );
};
