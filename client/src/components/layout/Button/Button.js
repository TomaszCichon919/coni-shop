import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({ className, onClick, children, special }) => {
  // Conditionally construct classes based on props
  const buttonClass = clsx(
    styles.button, // Default class
    {
      [styles.specialButton]: special, // Add specialButton class if specialProp is provided
    },
    className // Additional class provided as prop
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;