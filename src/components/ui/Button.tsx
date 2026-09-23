import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mineral-teal disabled:opacity-50 disabled:cursor-not-allowed select-none';

  // Size variations
  const sizeStyles = {
    sm: 'text-[11px] px-3.5 py-2 gap-1.5',
    md: 'text-xs px-5 py-3 gap-2',
    lg: 'text-sm px-7 py-4 gap-2.5',
  }[size];

  // Variant variations
  const variantStyles = {
    primary:
      'bg-evergreen text-white border border-evergreen hover:bg-evergreen-hover hover:border-evergreen-hover active:bg-evergreen-active',
    secondary:
      'bg-transparent text-evergreen border border-border-strong hover:bg-evergreen hover:text-white hover:border-evergreen active:bg-evergreen-active',
    accent:
      'bg-mineral-teal text-white border border-mineral-teal hover:bg-mineral-teal-hover hover:border-mineral-teal-hover active:bg-evergreen',
    ghost:
      'bg-transparent text-evergreen border border-transparent hover:bg-evergreen/5 hover:text-evergreen-hover underline-offset-4',
    white:
      'bg-white text-evergreen border border-white hover:bg-ivory-canvas hover:border-ivory-canvas active:bg-border shadow-xs',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-1" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  // Link router handling
  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  // External anchor handling
  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled || isLoading} {...props}>
      {content}
    </button>
  );
};
