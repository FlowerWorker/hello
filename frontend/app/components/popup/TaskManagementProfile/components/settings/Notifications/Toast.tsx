import React from 'react';

type ToastProps = {
  message: string;
  type: 'success' | 'error';
};

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 px-4 py-3 rounded text-white shadow-lg ${bgColor} z-50`}>
      {message}
    </div>
  );
};
