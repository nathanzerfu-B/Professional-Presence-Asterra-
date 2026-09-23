import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  variant?: 'lead' | 'body' | 'sm' | 'caption' | 'mono';
  color?: 'body' | 'ink' | 'muted' | 'white' | 'border' | 'evergreen';
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  color = 'body',
  children,
  className = '',
  ...props
}) => {
  const variantStyles = {
    lead: 'text-lg sm:text-xl leading-relaxed',
    body: 'text-sm sm:text-base leading-relaxed',
    sm: 'text-xs sm:text-sm leading-normal',
    caption: 'text-[11px] sm:text-xs leading-normal',
    mono: 'font-mono text-xs tracking-wider uppercase',
  }[variant];

  const colorStyles = {
    body: 'text-charcoal-body',
    ink: 'text-charcoal-ink',
    muted: 'text-charcoal-muted',
    white: 'text-white',
    border: 'text-border',
    evergreen: 'text-evergreen',
  }[color];

  return (
    <Component
      className={`font-sans ${variantStyles} ${colorStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};
