import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  strength?: 'subtle' | 'default' | 'strong' | 'evergreen';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  strength = 'default',
  className = '',
}) => {
  const colorStyles = {
    subtle: 'border-border/60',
    default: 'border-border',
    strong: 'border-border-strong',
    evergreen: 'border-evergreen-hover',
  }[strength];

  if (orientation === 'vertical') {
    return <div className={`border-r ${colorStyles} h-full min-h-[1.5rem] self-stretch ${className}`} />;
  }

  return <hr className={`border-0 border-t ${colorStyles} w-full my-6 ${className}`} />;
};
