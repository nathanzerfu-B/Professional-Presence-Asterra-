import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'mono' | 'division' | 'status' | 'outline' | 'dark';
  statusType?: 'success' | 'warning' | 'info' | 'error';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'mono',
  statusType = 'info',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center select-none';

  const variantStyles = {
    mono: 'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 bg-evergreen-subtle text-evergreen border border-[#D1DCD8]',
    division: 'font-mono text-xs uppercase tracking-widest font-bold px-3 py-1 bg-evergreen text-white border border-evergreen',
    outline: 'font-sans text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 text-charcoal-body border border-border bg-white',
    dark: 'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 bg-evergreen-hover text-white border border-mineral-teal/40',
    status: {
      success: 'font-sans text-[11px] font-semibold px-2.5 py-0.5 bg-green-50 text-state-success border border-green-200',
      warning: 'font-sans text-[11px] font-semibold px-2.5 py-0.5 bg-amber-50 text-state-warning border border-amber-200',
      info: 'font-sans text-[11px] font-semibold px-2.5 py-0.5 bg-sky-50 text-state-info border border-sky-200',
      error: 'font-sans text-[11px] font-semibold px-2.5 py-0.5 bg-red-50 text-state-error border border-red-200',
    }[statusType],
  }[variant];

  return (
    <span className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};
