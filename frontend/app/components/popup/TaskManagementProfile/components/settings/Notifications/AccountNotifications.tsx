'use client';

import { useUserSettings, UserSettings } from '@/app/components/popup/TaskManagementProfile/hooks';

const notificationCheckboxsList = [
    { id: 1, notification: 'All new messages' },
    { id: 2, notification: 'Direct messages and mentions' },
    { id: 3, notification: `Notify me about replies to threads I'm following` },
];

const AccountNotifications: React.FC = () => {
    const { userSettings, updateUserSettings } = useUserSettings();

    const handleCheckboxChange = (field: keyof UserSettings['notifications'], value: boolean) => {
        updateUserSettings({
            notifications: {
                ...userSettings.notifications,
                [field]: value
            }
        });
    };

    return (
        <div className='p-6 bg-white shadow-md rounded-md max-w-lg mx-auto'>
            {/* Notify me about */}
            <div className='mb-6'>
                <p className='text-lg font-semibold mb-3'>Notify me about</p>
                <ul className='space-y-3'>
                    {notificationCheckboxsList.map((item) => (
                        <li key={item.id}>
                            <label className='flex items-center space-x-2'>
                                <input
                                    type='checkbox'
                                    // checked={userSettings.notifications[item.notification.split(' ')[0].toLowerCase() as keyof UserSettings['notifications']]}
                                    onChange={(e) => handleCheckboxChange(item.notification.split(' ')[0].toLowerCase() as keyof UserSettings['notifications'], e.target.checked)}
                                    className='form-checkbox h-5 w-5 text-blue-600'
                                />
                                <span className='text-gray-800'>{item.notification}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Notification schedule */}
            <div className='mb-6'>
                <p className='text-lg font-semibold mb-3'>Notification schedule</p>
                <p className='text-sm text-gray-600 mb-4'>
                    You will only receive notifications in the hours you choose. Outside of
                    those times, notifications will be paused.
                </p>
                <div className='space-y-4'>
                    {/* Allow notifications */}
                    <div>
                        <p className='font-medium mb-2'>Allow notifications:</p>
                        <div className='flex items-center space-x-3'>
                            <select className='border border-black form-select block w-full mt-1 rounded-md shadow-sm'>
                                <option value='Every day'>Every day</option>
                                <option value='Weekdays'>Weekdays</option>
                            </select>
                            <span>From</span>
                            <select className='border border-black form-select rounded-md shadow-sm text-gray-700'>
                                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                                    <option key={hour} value={`${hour}:00 AM`}>
                                        {hour}:00 AM
                                    </option>
                                ))}
                            </select>
                            <span>To</span>
                            <select className='border border-black form-select rounded-md shadow-sm text-gray-700'>
                                {Array.from({ length: 12 }, (_, i) => i + 5).map((hour) => (
                                    <option key={hour} value={`${hour}:00 PM`}>
                                        {hour}:00 PM
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Default remind notifications */}
                    <div>
                        <p className='font-medium mb-2'>Set a default time for remind notifications:</p>
                        <select className='border border-black form-select rounded-md shadow-sm text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200'>
                            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                                <option key={hour} value={`${hour}:00 AM`}>
                                    {hour}:00 AM
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mobile notifications */}
                    <div>
                        <p className='font-medium mb-2'>When I am not active on desktop...</p>
                        <p className='text-sm text-gray-600 mb-2'>Send notifications to my mobile devices:</p>
                        <select className='border border-black form-select rounded-md shadow-sm text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200'>
                            <option value='Every day'>Every day</option>
                            <option value='Weekdays'>Weekdays</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Mute notifications */}
            <ul>
                <li>
                    <label className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            className='form-checkbox h-5 w-5 text-blue-600'
                        />
                        <span className='text-gray-800'>
                            Mute all message sounds from Gaddr
                        </span>
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default AccountNotifications;