import Button from './Button';

const EmptyState = ({
  icon: Icon,
  title = 'No data found',
  description = 'There is nothing to display here.',
  action,
  actionLabel,
  className = '',
}) => {
  return (
    <div className={`text-center py-16 animate-slide-up ${className}`}>
      {Icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 border-dashed border-matte-divider text-matte-stone/30 mx-auto mb-5">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-display font-bold text-matte-bone mb-2">{title}</h3>
      <p className="text-sm text-matte-stone/45 max-w-sm mx-auto mb-7 leading-relaxed">
        {description}
      </p>
      {action && actionLabel && (
        <Button onClick={action} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
