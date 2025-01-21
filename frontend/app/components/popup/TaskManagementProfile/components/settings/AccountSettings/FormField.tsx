import { FormFieldProps } from '../../../hooks/types';

export const FormField: React.FC<FormFieldProps> = ({ label, placeholder, descr }) => (
  <label className="p4">
    <p className="font-light text-left font-montserrat text-lg">{label}</p>
    <input
      style={{ borderWidth: '1.5px' }}
      className="border-black rounded-lg px-3 py-1.5 italic w-full text-lg"
      type="text"
      placeholder={placeholder}
    />
    <p style={{ color: '#A7A19B' }} className="font-light text-sm p-1">
      {descr}
    </p>
  </label>
); 