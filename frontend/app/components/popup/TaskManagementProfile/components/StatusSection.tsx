import React, { useEffect, useState } from 'react';
import { StatusSectionProps, StatusOption, useStatusState } from '@/app/components/popup/TaskManagementProfile/hooks';
import { StatusDropdown } from "@/app/components/popup/TaskManagementProfile/components/StatusDropdown";
import { useAvailabilityStatus } from "../hooks/useAvailabilityStatus";
import { DateTime } from 'luxon';
import { useStatusContext } from "@/lib/status-context";
import { useUserNotificationsContext } from '@/lib/user-notifications-settings-context';
export const StatusSection: React.FC= () => {
    const { isStatusOpen, toggleStatus } = useStatusState();
    const { notifications } = useUserNotificationsContext();
  const { updateAvailabilityStatus } = useAvailabilityStatus();
  const { status, setStatus } = useStatusContext();

  const [localTime, setLocalTime] = useState('');
  const handleAvailabilityStatusChange = async (option: StatusOption) => {
    setStatus(option);
    toggleStatus();

    if (option.value) {
      await updateAvailabilityStatus(option.value);
    }
  };
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
                selectStatus={handleAvailabilityStatusChange}
            />

            {/* Current local time */}
            <p className='text-base text-gray-500 mt-2'>{localTime} - {notifications?.time_zone || 'UTC'}</p>
        </div>
    );
};