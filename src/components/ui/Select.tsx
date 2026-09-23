import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: { value: string; label: string }[];
  requiredIndicator?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, requiredIndicator, className = '', id, required, children, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block font-mono text-[11px] uppercase tracking-widest text-charcoal-body font-semibold"
          >
            {label}
            {(required || requiredIndicator) && <span className="text-state-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            className={`w-full appearance-none px-4 py-3 bg-white text-charcoal-ink text-sm border transition-colors duration-150 pr-10 focus:outline-none focus:ring-1 cursor-pointer ${
              error
                ? 'border-state-error focus:border-state-error focus:ring-state-error'
                : 'border-border focus:border-mineral-teal focus:ring-mineral-teal hover:border-border-strong'
            } ${className}`.trim()}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-muted pointer-events-none" />
        </div>
        {error ? (
          <p className="text-xs text-state-error font-sans">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-charcoal-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
