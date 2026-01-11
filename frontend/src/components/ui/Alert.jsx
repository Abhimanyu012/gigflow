import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', title, message, className = '' }) => {
  const types = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: Info,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle,
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        rounded-lg border p-4 ${config.bg} ${config.border} ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.text} shrink-0 mt-0.5`} />
        <div>
          {title && (
            <h4 className={`font-medium ${config.text}`}>{title}</h4>
          )}
          {message && (
            <p className={`text-sm ${config.text} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;
