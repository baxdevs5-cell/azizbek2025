import React from 'react';
import { Loader2, AlertCircle, Inbox, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button.tsx';

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Yuklanmoqda...'
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center min-h-[220px]">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{message}</p>
  </div>
);

export const EmptyState: React.FC<{
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}> = ({
  title = 'Ma’lumot topilmadi',
  description = 'Hozircha hech qanday ma’lumot mavjud emas.',
  actionText,
  onAction,
  icon
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl">
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-neutral-800 text-gray-400 dark:text-gray-500 mb-4">
      {icon || <Inbox className="w-6 h-6" />}
    </div>
    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-5">{description}</p>
    {actionText && onAction && (
      <Button variant="secondary" size="sm" onClick={onAction}>
        {actionText}
      </Button>
    )}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = 'Xatolik yuz berdi',
  message = 'Ma’lumotlarni yuklab bo‘lmadi. Iltimos qaytadan urinib ko‘ring.',
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-center bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl">
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 mb-4">
      <AlertCircle className="w-6 h-6" />
    </div>
    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mb-5">{message}</p>
    {onRetry && (
      <Button variant="outline" size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={onRetry}>
        Qayta urinish
      </Button>
    )}
  </div>
);
