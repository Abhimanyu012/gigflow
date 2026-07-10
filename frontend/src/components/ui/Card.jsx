/* Card — supports dark (default) and light variants */
const Card = ({ children, className = '', hover = false, light = false, ...props }) => {
  const base = light
    ? 'bg-matte-bone border-matte-gray/50 shadow-[0_2px_8px_rgba(28,29,31,0.04)]'
    : 'bg-matte-surface border-matte-divider shadow-[0_2px_12px_rgba(0,0,0,0.18)]';

  const hoverStyles = hover
    ? light
      ? 'hover:shadow-[0_8px_28px_rgba(28,29,31,0.08)] hover:border-matte-gray-mid hover:-translate-y-[1px] cursor-pointer'
      : 'hover:shadow-[0_8px_28px_rgba(0,0,0,0.28)] hover:border-matte-surface-raised hover:-translate-y-[1px] cursor-pointer'
    : '';

  return (
    <div
      className={`
        rounded-xl border transition-all duration-200
        ${base}
        ${hoverStyles}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', light = false }) => (
  <div
    className={`
      px-6 py-5 border-b
      ${light ? 'border-matte-gray/30' : 'border-matte-divider'}
      ${className}
    `.trim()}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '', light = false }) => (
  <div
    className={`
      px-6 py-4 border-t
      ${light ? 'border-matte-gray/30' : 'border-matte-divider'}
      ${className}
    `.trim()}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
