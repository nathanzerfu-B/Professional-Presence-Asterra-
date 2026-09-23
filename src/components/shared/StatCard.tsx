import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  context?: string;
  theme?: 'light' | 'dark' | 'evergreen' | 'ivory';
  size?: 'sm' | 'md' | 'lg';
  index?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  context,
  theme = 'light',
  size = 'md',
  index,
  className = '',
}) => {
  const themeStyles = {
    light: {
      container: 'border-t border-border pt-4 bg-transparent',
      index: 'text-mineral-teal',
      label: 'text-charcoal-muted',
      value: 'text-evergreen',
      context: 'text-charcoal-muted',
    },
    dark: {
      container: 'border-t border-white/20 pt-4 bg-transparent',
      index: 'text-mineral-teal',
      label: 'text-border/70',
      value: 'text-white',
      context: 'text-border/80',
    },
    evergreen: {
      container: 'border-t border-white/20 pt-4 bg-transparent',
      index: 'text-mineral-teal',
      label: 'text-border/70',
      value: 'text-white',
      context: 'text-border/90',
    },
    ivory: {
      container: 'border-t border-[#D9D3C7] pt-4 bg-transparent',
      index: 'text-mineral-teal',
      label: 'text-charcoal-muted',
      value: 'text-evergreen',
      context: 'text-charcoal-muted',
    },
  }[theme];

  const sizeStyles = {
    sm: 'text-xl sm:text-2xl font-bold',
    md: 'text-2xl sm:text-3xl font-bold tracking-tight',
    lg: 'text-3xl sm:text-4xl font-bold tracking-tight',
  }[size];

  return (
    <div className={`${themeStyles.container} ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold ${themeStyles.label}`}>
          {label}
        </span>
        {index && (
          <span className={`font-mono text-[10px] font-bold ${themeStyles.index}`}>
            //{index}
          </span>
        )}
      </div>
      <div className={`font-serif ${sizeStyles} ${themeStyles.value}`}>
        {value}
      </div>
      {context && (
        <p className={`font-sans text-xs mt-1.5 leading-relaxed ${themeStyles.context}`}>
          {context}
        </p>
      )}
    </div>
  );
};
