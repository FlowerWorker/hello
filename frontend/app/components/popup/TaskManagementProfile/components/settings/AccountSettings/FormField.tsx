import { FormFieldProps } from '@/app/components/popup/TaskManagementProfile/hooks';
import React from 'react';
import { clsx } from "clsx"
export const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  descr,
  value,
  onChange,
  type = 'text',
  error,
}) => {
  const inputId = label.toLowerCase().replace(/\s+/g, '_');

  return (
    <label htmlFor={inputId} className="p-4 block">
      <p className="font-light text-left font-montserrat text-lg mb-1">{label}</p>
      <input
        id={inputId}
        name={inputId}
        style={{ borderWidth: '1.5px' }}
        className={clsx("rounded-lg px-3 py-1.5 italic w-full text-lg", 
          "focus:outline-none focus:ring-2 focus:ring-purple-400"
        , error ? "border-red-600" : "border-black")}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p style={{ color: '#A7A19B' }} className="font-light text-sm p-1">
        {descr}
      </p>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </label>
      );
};
