import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      type = 'text',
      placeholder,
      className = '',
      light = false,   // true → light surface (bone bg), false → dark surface
      helper,
      ...props
    },
    ref
  ) => {
    const inputBase = light
      ? `bg-matte-bone text-matte-charcoal placeholder-matte-charcoal/35
         border border-matte-gray/70
         focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20
         autofill-light`
      : `bg-matte-charcoal-light text-matte-bone placeholder-matte-stone/30
         border border-matte-divider
         focus:border-brand-emerald/60 focus:ring-2 focus:ring-brand-emerald/15`;

    const labelColor = light ? 'text-matte-charcoal/75' : 'text-matte-stone/55';

    return (
      <div className="w-full">
        {label && (
          <label className={`block text-xs font-sans font-semibold uppercase tracking-wider mb-1.5 ${labelColor}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-md text-sm
            focus:outline-none
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200 min-h-[44px]
            ${inputBase}
            ${error ? '!border-red-500/70 focus:!ring-red-500/20' : ''}
            ${className}
          `.trim()}
          {...props}
        />
        {helper && !error && (
          <p className="mt-1.5 text-[11px] text-matte-stone/35 font-medium">{helper}</p>
        )}
        {error && (
          <p className="mt-1.5 text-[11px] text-red-400 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
