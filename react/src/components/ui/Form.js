import React from 'react';
import './Form.css';

const Form = ({ children, onSubmit, title }) => {
  return (
    <form className="custom-form" onSubmit={onSubmit}>
      {title && <h2 className="form-title">{title}</h2>}
      {children}
    </form>
  );
};

export default Form;
