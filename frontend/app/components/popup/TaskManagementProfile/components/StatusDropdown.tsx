import React from 'react';
import Image from 'next/image';
import { StatusOption, StatusDropdownProps, STATUSOPTIONS } from '@/app/components/popup/TaskManagementProfile/hooks';
import arrowUpIcon from '@/app/public/arrowUpIcon.svg';
import arrowDownIcon from '@/app/public/arrowDownIcon.svg';

export const StatusDropdown = ({ status, isStatusOpen, toggleStatus, selectStatus }: StatusDropdownProps) => {
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
                                <Image src={option.icon} alt={option.label} width={20} height={20} className='inline mr-2' />
                            )}
                            <span className='ml-2'>{option.label}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}