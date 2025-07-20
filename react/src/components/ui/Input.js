import React from 'react';
import './Input.css';

const Input = ({ type = 'text', placeholder, value, onChange, required = false, name, id }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      name={name}
      id={id}
      className="custom-input"
    />
  );
};

export default Input;
