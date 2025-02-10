import React from 'react';
import { StatusSectionProps, StatusOption, useStatusState } from '@/app/components/popup/TaskManagementProfile/hooks';
import { StatusDropdown } from '@/app/components/popup/TaskManagementProfile/components/StatusDropdown';

export const StatusSection: React.FC<StatusSectionProps> = ({ status, setStatus }) => {
    const { isStatusOpen, toggleStatus } = useStatusState();

    return (
        <div className='relative mt-4 mb-6'>
            <StatusDropdown
                status={status}
                isStatusOpen={isStatusOpen}
                toggleStatus={toggleStatus}
                selectStatus={(option: StatusOption) => {
                    setStatus(option);
                    toggleStatus();
                }}
            />

            {/* Current local time */}
            <p className='text-base text-gray-500 mt-2'>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} local time</p>
        </div>
    );
};