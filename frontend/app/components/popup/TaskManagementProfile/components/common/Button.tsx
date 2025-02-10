import React from 'react';
import { ButtonProps } from '@/app/components/popup/TaskManagementProfile/hooks';

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', type = 'button', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded transition-colors duration-200';
  const variantStyles = {
    primary: 'bg-purple-500 text-white hover:bg-purple-600',
    secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};