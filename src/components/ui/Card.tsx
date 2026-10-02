import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6'
  };

  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800/80 rounded-2xl shadow-xs ${
        hoverable ? 'transition-all duration-200 hover:shadow-md hover:border-gray-200 dark:hover:border-neutral-700' : ''
      } ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
