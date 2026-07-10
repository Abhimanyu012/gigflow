const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variants = {
    default:  'bg-white/8 text-matte-stone/70 border border-white/10',
    primary:  'bg-brand-emerald/15 text-brand-emerald-light border border-brand-emerald/20',
    success:  'bg-emerald-900/40 text-emerald-300 border border-emerald-700/30',
    warning:  'bg-amber-900/40 text-amber-300 border border-amber-700/30',
    danger:   'bg-red-900/40 text-red-300 border border-red-700/30',
    info:     'bg-white/6 text-matte-stone/60 border border-white/8',
    brass:    'bg-amber-900/30 text-amber-400 border border-amber-800/20 font-mono',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] tracking-wide',
    md: 'px-2.5 py-1 text-xs tracking-wide',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-sm uppercase
        ${variants[variant] ?? variants.default}
        ${sizes[size] ?? sizes.md}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
};

export default Badge;
