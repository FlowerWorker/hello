'use client';

import React from 'react';
import Image from 'next/image';
import { ProfileSettingsProps, useTabState, SETTINGS_TABS } from '@/app/components/popup/TaskManagementProfile/hooks';
import AccountSettings from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/AccountSettings';
import Notifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/NotificationCenter';
import TimeZone from '@/app/components/popup/TaskManagementProfile/components/settings/TimeZone';
import closeIcon from '@/app/public/closeIcon.png';

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ toggleSettings }) => {
  const { activeTab, setActiveTab } = useTabState(SETTINGS_TABS.NOTIFICATIONS); // Default tab = NOTIFICATIONS

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-full max-h-screen bg-white rounded-lg overflow-y-auto">
        {/* Top Bar */}
        <div className="relative w-full h-40 bg-gradient-to-t from-[#B86ECE] to-[#1E191C] flex items-center justify-center">
          <nav className="flex space-x-7 z-10">
            {[
              { label: 'Account settings', tab: SETTINGS_TABS.ACCOUNT },
              { label: 'Notifications', tab: SETTINGS_TABS.NOTIFICATIONS },
              { label: 'Time Zone', tab: SETTINGS_TABS.TIMEZONE },
            ].map(({ label, tab }) => (
              <button
                key={tab}
                className={`text-2xl text-white relative ${
                  activeTab === tab
                    ? 'font-bold after:content-[" "] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                    : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {label}
              </button>
            ))}
          </nav>
          <button className="absolute top-4 right-6 z-20" onClick={toggleSettings}>
            <Image src={closeIcon} alt="closeIcon" width={24} height={24} />
          </button>
        </div>

        {/* Main Content */}
        <div className="w-full px-10 py-6 sm:px-6 sm:py-4 min-h-[70vh] flex flex-col justify-between mx-auto max-w-6xl">
          {activeTab === SETTINGS_TABS.ACCOUNT && <AccountSettings />}
          {activeTab === SETTINGS_TABS.NOTIFICATIONS && <Notifications />}
          {activeTab === SETTINGS_TABS.TIMEZONE && <TimeZone />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;