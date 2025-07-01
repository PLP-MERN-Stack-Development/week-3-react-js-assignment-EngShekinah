import PropTypes from 'prop-types';

const Button = ({ 
  variant = 'primary', 
  onClick, 
  label, 
  children, 
  disabled = false, 
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`.trim();

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children || label}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  label: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;