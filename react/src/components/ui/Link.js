import React from 'react';
import './Link.css';

const Link = ({ children, onClick, to }) => {
  return (
    <a href={to} onClick={onClick} className="custom-link">
      {children}
    </a>
  );
};

export default Link;
