'use client';

import { useState } from 'react';
import { useTabState, useUserSettings, NOTIFICATION_TABS } from '@/app/components/popup/TaskManagementProfile/hooks';
import AccountNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/AccountNotifications';
import EmailNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/EmailNotifications';
import SoundsAppearance from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/SoundAppearance';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';

const Notifications: React.FC = () => {
    const { activeTab, setActiveTab } = useTabState(NOTIFICATION_TABS.ACCOUNT);
    const { userSettings, updateUserSettings } = useUserSettings();

    const [tempSettings, setTempSettings] = useState(userSettings.notifications);

    const handleSave = () => {
        updateUserSettings({ notifications: tempSettings });
        alert('Settings saved successfully!');
    };

    const handleCancel = () => {
        setTempSettings(userSettings.notifications); // Reset to original settings
        alert('Changes discarded!');
    };

    return (
        <div className='flex flex-col h-auto max-h-screen'>
            <div className='flex'>
                {/* Sidebar */}
                <div className='w-1/4 bg-white p-4 space-y-4 flex flex-col justify-start mt-6'>
                    <button
                        className={`w-full text-lg p-2 rounded-md text-center font-normal ${activeTab === NOTIFICATION_TABS.ACCOUNT ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
                            }`}
                        onClick={() => setActiveTab(NOTIFICATION_TABS.ACCOUNT)}
                    >
                        Account notifications
                    </button>
                    <button
                        className={`w-full text-lg p-2 rounded-md text-center font-normal ${activeTab === NOTIFICATION_TABS.SOUNDS ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
                            }`}
                        onClick={() => setActiveTab(NOTIFICATION_TABS.SOUNDS)}
                    >
                        Sounds and appearance
                    </button>
                    <button
                        className={`w-full text-lg p-2 rounded-md text-center font-normal ${activeTab === NOTIFICATION_TABS.EMAIL ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
                            }`}
                        onClick={() => setActiveTab(NOTIFICATION_TABS.EMAIL)}
                    >
                        Email notification
                    </button>
                </div>

                {/* Content */}
                <div className='w-2/3 p-6 flex flex-col justify-start mt-6'>
                    {activeTab === NOTIFICATION_TABS.ACCOUNT && <AccountNotifications />}
                    {activeTab === NOTIFICATION_TABS.EMAIL && <EmailNotifications />}
                    {activeTab === NOTIFICATION_TABS.SOUNDS && <SoundsAppearance />}
                </div>
            </div>

            {/* Footer Buttons */}
            <div className='flex justify-end p-4 space-x-4'>
                <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
                <Button variant='primary' onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default Notifications;