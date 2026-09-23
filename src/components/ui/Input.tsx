import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  requiredIndicator?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, requiredIndicator, className = '', id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-mono text-[11px] uppercase tracking-widest text-charcoal-body font-semibold"
          >
            {label}
            {(required || requiredIndicator) && <span className="text-state-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full px-4 py-3 bg-white text-charcoal-ink placeholder:text-charcoal-muted/60 text-sm border transition-colors duration-150 focus:outline-none focus:ring-1 ${
            error
              ? 'border-state-error focus:border-state-error focus:ring-state-error'
              : 'border-border focus:border-mineral-teal focus:ring-mineral-teal hover:border-border-strong'
          } ${className}`.trim()}
          {...props}
        />
        {error ? (
          <p className="text-xs text-state-error font-sans">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-charcoal-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
