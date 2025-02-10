import React, { useState } from 'react';
import { StatusDropdown } from '@/app/components/popup/TaskManagementProfile/components/StatusDropdown';

interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
};

interface StatusSectionProps {
    status: StatusOption;
    setStatus: (status: StatusOption) => void;
}

export const StatusSection: React.FC<StatusSectionProps> = ({ status, setStatus }) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const toggleStatus = () => setIsStatusOpen(prev => !prev);

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