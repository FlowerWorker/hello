import React, { useEffect, useState } from 'react';
import { StatusSectionProps, StatusOption, useStatusState } from '@/app/components/popup/TaskManagementProfile/hooks';
import { StatusDropdown } from '@/app/components/popup/TaskManagementProfile/components/StatusDropdown';
import { DateTime } from 'luxon';
import { useUserNotificationsContext } from '@/lib/user-notifications-settings-context';
export const StatusSection: React.FC<StatusSectionProps> = ({ status, setStatus }) => {
    const { isStatusOpen, toggleStatus } = useStatusState();
    const { notifications } = useUserNotificationsContext();
    const [localTime, setLocalTime] = useState('');
    useEffect(() => {
        const updateLocalTime = () => {
            const zone = notifications?.time_zone || 'UTC';
            const time = DateTime.now().setZone(zone).toFormat('HH:mm');
            setLocalTime(time);
        };

        updateLocalTime();
        const interval = setInterval(updateLocalTime, 60000);

        return () => clearInterval(interval);
    }, [notifications?.time_zone]);
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
            <p className='text-base text-gray-500 mt-2'>{localTime} - {notifications?.time_zone || 'UTC'}</p>
        </div>
    );
};