import React from 'react';
import Image from 'next/image';
import arrowUpIcon from '@/app/public/arrowUpIcon.svg';
import arrowDownIcon from '@/app/public/arrowDownIcon.svg';
import activeIcon from '@/app/public/activeIcon.svg';

interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
};

interface StatusDropdownProps {
    status: StatusOption;
    isStatusOpen: boolean;
    toggleStatus: () => void;
    selectStatus: (option: StatusOption) => void;
};

const STATUSOPTIONS = [
    { value: 'Active', label: 'Active', icon: activeIcon },
    { value: 'Busy', label: 'Busy', icon: activeIcon },
    { value: 'On a call', label: 'On a call', icon: activeIcon },
    { value: 'In a meeting', label: 'In a meeting', icon: activeIcon },
    { value: 'Out for lunch', label: 'Out for lunch', icon: activeIcon },
];

export const StatusDropdown: React.FC<StatusDropdownProps> = ({ status, isStatusOpen, toggleStatus, selectStatus }) => {
  return (
    <div>
      {/* Dropdown Status Header */}
      <button 
        className='w-full flex items-center justify-between Montserrat text-xl font-medium'
        onClick={toggleStatus}
      > 
        <span>
          {status.icon && typeof status.icon === 'string' && (
            <Image 
              src={status.icon} 
              alt={status.label} 
              width={20} 
              height={20} 
              className='inline mr-2'
            />
          )}
          {status.label}
        </span>
        {isStatusOpen ? 
          <Image src={arrowUpIcon} alt='Arrow up' /> : 
          <Image src={arrowDownIcon} alt='Arrow down' />
        }
      </button>

      {/* Dropdown Status Options */}
      {isStatusOpen && (
      <ul className='w-full mt-1 rounded-md bg-white shadow-sm Montserrat text-lg font-medium'>
        {STATUSOPTIONS.map((option: StatusOption) => (
          <li
            key={option.value}
            className='flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => selectStatus(option)}
          >
            {option.icon && typeof option.icon === 'string' && (
              <Image src={option.icon} alt={option.label} width={20} height={20} className='inline mr-2'/>
            )}
            <span className='ml-2'>{option.label}</span>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
;}