import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  requiredIndicator?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, requiredIndicator, className = '', id, required, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-mono text-[11px] uppercase tracking-widest text-charcoal-body font-semibold"
          >
            {label}
            {(required || requiredIndicator) && <span className="text-state-error ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          rows={rows}
          className={`w-full px-4 py-3 bg-white text-charcoal-ink placeholder:text-charcoal-muted/60 text-sm border transition-colors duration-150 focus:outline-none focus:ring-1 resize-y ${
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

Textarea.displayName = 'Textarea';
