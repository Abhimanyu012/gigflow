import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold rounded-md transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const variants = {
    primary:
      'btn-glass-primary focus-visible:ring-brand-emerald focus-visible:ring-offset-matte-charcoal',
    secondary:
      'btn-glass-dark focus-visible:ring-white/20 focus-visible:ring-offset-matte-charcoal',
    outline:
      'border border-brand-emerald/60 text-brand-emerald bg-transparent hover:bg-brand-emerald/8 hover:border-brand-emerald focus-visible:ring-brand-emerald',
    'outline-light':
      'border border-matte-gray/60 text-matte-charcoal bg-transparent hover:bg-matte-gray/20 focus-visible:ring-matte-charcoal',
    danger:
      'bg-red-900/90 text-white border border-red-800/40 hover:bg-red-900 shadow-sm focus-visible:ring-red-700',
    success:
      'btn-glass-primary focus-visible:ring-brand-emerald focus-visible:ring-offset-matte-charcoal',
    ghost:
      'text-matte-bone/70 hover:text-matte-bone hover:bg-white/6 focus-visible:ring-white/20',
    'ghost-light':
      'text-matte-charcoal/60 hover:text-matte-charcoal hover:bg-matte-charcoal/6 focus-visible:ring-matte-charcoal',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs gap-1.5 min-h-[34px]',
    sm: 'px-3.5 py-2 text-xs gap-1.5 min-h-[38px]',
    md: 'px-5 py-2.5 text-sm gap-2 min-h-[44px]',
    lg: 'px-7 py-3.5 text-base gap-2.5 min-h-[52px]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim()}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
