import { FormFieldProps } from '@/app/components/popup/TaskManagementProfile/hooks';

export const FormField: React.FC<FormFieldProps> = ({ label, placeholder, descr, value, onChange }) => (
    <label className='p4'>
        <p className='font-light text-left font-montserrat text-lg'>{label}</p>
        <input
            style={{ borderWidth: '1.5px' }}
            className='border-black rounded-lg px-3 py-1.5 italic w-full text-lg'
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <p style={{ color: '#A7A19B' }} className='font-light text-sm p-1'>
            {descr}
        </p>
    </label>
); 