import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', title, message, className = '' }) => {
  const types = {
    info: {
      bg:     'bg-white/4',
      border: 'border-white/10',
      text:   'text-matte-stone/80',
      iconColor: 'text-matte-stone/50',
      icon:   Info,
    },
    success: {
      bg:     'bg-brand-emerald/10',
      border: 'border-brand-emerald/20',
      text:   'text-emerald-300',
      iconColor: 'text-emerald-400',
      icon:   CheckCircle,
    },
    warning: {
      bg:     'bg-amber-900/20',
      border: 'border-amber-700/30',
      text:   'text-amber-300',
      iconColor: 'text-amber-400',
      icon:   AlertCircle,
    },
    error: {
      bg:     'bg-red-900/20',
      border: 'border-red-700/30',
      text:   'text-red-300',
      iconColor: 'text-red-400',
      icon:   XCircle,
    },
  };

  const config = types[type] ?? types.info;
  const Icon = config.icon;

  return (
    <div className={`rounded-md border p-4 ${config.bg} ${config.border} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-4.5 h-4.5 ${config.iconColor} shrink-0 mt-0.5`} />
        <div>
          {title && (
            <h4 className={`text-sm font-semibold ${config.text}`}>{title}</h4>
          )}
          {message && (
            <p className={`text-sm ${config.text} opacity-80 ${title ? 'mt-0.5' : ''}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
