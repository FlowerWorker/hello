'use client'

import React from 'react';
import Image from 'next/image';
import { ProfileSettingsProps, useTabState, SETTINGS_TABS } from '@/app/components/popup/TaskManagementProfile/hooks';
import AccountSettings from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/AccountSettings';
import Notifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/NotificationCenter';
import TimeZone from '@/app/components/popup/TaskManagementProfile/components/settings/TimeZone';
import closeIcon from '@/app/public/closeIcon.png';

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ toggleSettings }) => {
    const { activeTab, setActiveTab } = useTabState(SETTINGS_TABS.ACCOUNT);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='w-full h-full bg-white rounded-lg overflow-hidden'>
                <div className='relative w-full h-40 bg-gradient-to-t from-[#B86ECE] to-[#1E191C] flex items-center justify-center'>
                    <nav className='flex space-x-7 z-10'>
                        <button
                            className={`text-lg text-white relative ${activeTab === SETTINGS_TABS.ACCOUNT
                                ? 'font-bold after:content-[" "] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                                : ''
                                }`}
                            onClick={() => setActiveTab(SETTINGS_TABS.ACCOUNT)}
                        >
                            Account settings
                        </button>
                        <button
                            className={`text-lg text-white relative ${activeTab === SETTINGS_TABS.NOTIFICATIONS
                                ? 'font-bold after:content-[" "] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                                : ''
                                }`}
                            onClick={() => setActiveTab(SETTINGS_TABS.NOTIFICATIONS)}
                        >
                            Notifications
                        </button>
                        <button
                            className={`text-lg text-white relative ${activeTab === SETTINGS_TABS.TIMEZONE
                                ? 'font-bold after:content-[" "] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                                : ''
                                }`}
                            onClick={() => setActiveTab(SETTINGS_TABS.TIMEZONE)}
                        >
                            Time Zone
                        </button>
                    </nav>
                    <div>
                        <button
                            className='absolute top-2 right-4'
                            onClick={toggleSettings}
                        >
                            <Image src={closeIcon} alt='closeIcon' width={20} height={20} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className='w-full p-6 mt-6'>
                    {activeTab === SETTINGS_TABS.ACCOUNT && <AccountSettings />}
                    {activeTab === SETTINGS_TABS.NOTIFICATIONS && <Notifications />}
                    {activeTab === SETTINGS_TABS.TIMEZONE && <TimeZone />}
                </div>
            </div>
        </div>
    )
};

export default ProfileSettings;