import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = ({ className, onClick, children, special }) => {
  
  const buttonClass = clsx(
    styles.button,
    {
      [styles.specialButton]: special,
    },
    className
  );

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;