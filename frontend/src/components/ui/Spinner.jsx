import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-brand-emerald`} />
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/15 mb-5">
        <Loader2 className="w-7 h-7 animate-spin text-brand-emerald" />
      </div>
      <p className="text-sm font-display font-semibold text-matte-stone/50 tracking-widest uppercase">
        Loading
      </p>
    </div>
  </div>
);

export { Spinner, LoadingScreen };
