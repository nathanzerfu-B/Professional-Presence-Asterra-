import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  font?: 'serif' | 'sans';
  size?: 'display-xl' | 'display-lg' | 'display-md' | 'heading-lg' | 'heading-md' | 'heading-sm';
  color?: 'ink' | 'evergreen' | 'white' | 'muted';
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  font = 'serif',
  size,
  color = 'ink',
  children,
  className = '',
  ...props
}) => {
  // Default sizes based on semantic heading tag if not explicitly set
  const resolvedSize =
    size ||
    ({
      h1: 'display-lg',
      h2: 'display-md',
      h3: 'heading-lg',
      h4: 'heading-md',
      h5: 'heading-sm',
      h6: 'heading-sm',
    }[Component] as HeadingProps['size']);

  const sizeStyles = {
    'display-xl': 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]',
    'display-lg': 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]',
    'display-md': 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.12]',
    'heading-lg': 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.18]',
    'heading-md': 'text-lg sm:text-xl lg:text-2xl font-semibold leading-[1.22]',
    'heading-sm': 'text-base sm:text-lg font-semibold leading-[1.28]',
  }[resolvedSize || 'heading-lg'];

  const fontStyles = {
    serif: 'font-serif',
    sans: 'font-sans',
  }[font];

  const colorStyles = {
    ink: 'text-charcoal-ink',
    evergreen: 'text-evergreen',
    white: 'text-white',
    muted: 'text-charcoal-muted',
  }[color];

  return (
    <Component
      className={`${fontStyles} ${sizeStyles} ${colorStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};
