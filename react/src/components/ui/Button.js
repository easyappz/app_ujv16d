import React from 'react';
import './Button.css';

const Button = ({ children, type = 'button', onClick, variant = 'primary', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button custom-button--${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
