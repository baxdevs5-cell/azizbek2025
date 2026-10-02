import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card.tsx';
import { Button } from '../ui/Button.tsx';
import { Badge } from '../ui/Badge.tsx';
import { Exercise, ExerciseOption } from '@/shared/types/index.ts';
import { exerciseApi, ExerciseSubmitResult } from '../../api/exerciseApi.ts';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onAnswered?: (isCorrect: boolean) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  onAnswered
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<ExerciseSubmitResult | null>(null);

  const handleSubmit = async () => {
    if (!selectedKey || isSubmitting || result) return;

    setIsSubmitting(true);
    try {
      const res = await exerciseApi.submit(exercise.id, selectedKey);
      if (res.success && res.data) {
        setResult(res.data);
        if (onAnswered) {
          onAnswered(res.data.is_correct);
        }
      }
    } catch (e) {
      console.error('Error submitting exercise:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedKey('');
    setResult(null);
  };

  const typeLabels: Record<string, string> = {
    multiple_choice: 'Ko‘p variantli',
    true_false: 'Rost yoki Yolg‘on',
    fill_in_the_blank: 'Bo‘shliqni to‘ldirish',
    matching: 'Moslashtirish'
  };

  return (
    <Card className="border border-gray-100 dark:border-neutral-800">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
          Mashq #{index + 1}
        </span>
        <Badge variant="blue" size="sm">
          {typeLabels[exercise.type] || 'Mashq'}
        </Badge>
      </div>

      <h4 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-4 leading-relaxed">
        {exercise.question}
      </h4>

      <div className="space-y-2 mb-4">
        {exercise.options.map((option: ExerciseOption) => {
          const isSelected = selectedKey === option.option_key;
          let optionStyles = 'border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200';

          if (result) {
            if (option.option_key === result.correct_option_key) {
              optionStyles = 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 font-medium';
            } else if (isSelected && !result.is_correct) {
              optionStyles = 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300';
            } else {
              optionStyles = 'opacity-40 border-gray-100 dark:border-neutral-800';
            }
          } else if (isSelected) {
            optionStyles = 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold ring-1 ring-blue-600';
          }

          return (
            <button
              key={option.id || option.option_key}
              type="button"
              disabled={!!result}
              onClick={() => setSelectedKey(option.option_key)}
              className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm flex items-center justify-between transition-all cursor-pointer ${optionStyles}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-neutral-800 text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center justify-center shrink-0">
                  {option.option_key}
                </span>
                <span>{option.option_text}</span>
              </div>
              {result && option.option_key === result.correct_option_key && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              )}
              {result && isSelected && !result.is_correct && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {result ? (
        <div className={`p-4 rounded-xl border ${
          result.is_correct
            ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
            : 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
        }`}>
          <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs md:text-sm">
            {result.is_correct ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">To‘g‘ri javob! Barakalla!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="text-rose-700 dark:text-rose-300">Noto‘g‘ri. To‘g‘ri javob: {result.correct_option_key}</span>
              </>
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
            <span className="font-semibold text-gray-700 dark:text-gray-200">Izoh: </span>
            {result.explanation}
          </p>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Qayta ishlash
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Variantni tanlang
          </span>
          <Button
            size="sm"
            disabled={!selectedKey}
            loading={isSubmitting}
            onClick={handleSubmit}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Tekshirish
          </Button>
        </div>
      )}
    </Card>
  );
};
