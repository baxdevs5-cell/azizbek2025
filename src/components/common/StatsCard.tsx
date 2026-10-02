import React from 'react';
import { Card } from '../ui/Card.tsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  badge?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  badge
}) => {
  return (
    <Card hoverable className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {value}
          </h4>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          {icon}
        </div>
      </div>
      {badge && (
        <span className="inline-block mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          {badge}
        </span>
      )}
    </Card>
  );
};
