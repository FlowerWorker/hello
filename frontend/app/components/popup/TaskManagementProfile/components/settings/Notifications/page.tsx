'use client';

import { useState } from 'react';
import AccountNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/AccountNotifications';
import EmailNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/EmailNotifications';
import SoundsAppearance from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/SoundAppearance';

interface UserSettings {
  profile: {
      fullName: string;
      jobTitle: string;
      email: string;
      department: string;
      phoneNumber: string;
  };
  profilePhoto: string,
  notifications: {
      allNewMessages: boolean;
      directMessages: boolean;
      threadReplies: boolean;
      schedule: string;
      notificationHours: {
          start: string;
          end: string;
      };
  };
}

const NOTIFICATION_TABS = {
  ACCOUNT: 'account-notifications',
  EMAIL: 'email-notification',
  SOUNDS: 'sounds-appearance',
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState(NOTIFICATION_TABS.ACCOUNT);

  const [userSettings, setUserSettings] = useState<UserSettings>({
    profile: {
      fullName: 'User Name',  // Default values
      jobTitle: 'Job title',
      email: 'username@gmail.com',
      department: 'Team',
      phoneNumber: '01231234532',
    },
    profilePhoto: '',
    notifications: {
      allNewMessages: true,
      directMessages: true,
      threadReplies: false,
      schedule: 'Every day',
      notificationHours: {
          start: '9:00 AM',
          end: '5:00 PM',
      },
    },
  });

  const updateUserSettings = (newSettings: Partial<UserSettings>) => {
      setUserSettings(prev => ({ ...prev, ...newSettings }));
  };

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
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.ACCOUNT ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
            }`} 
            onClick={() => setActiveTab(NOTIFICATION_TABS.ACCOUNT)}
          >
            Account notifications
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.SOUNDS ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
            }`} 
            onClick={() => setActiveTab(NOTIFICATION_TABS.SOUNDS)}
          >
            Sounds and appearance
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.EMAIL ? 'bg-[#E9E7E5] text-black' : 'bg-white text-gray-600'
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
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-gray-300 text-gray-700 hover:bg-gray-400' onClick={handleCancel}>Cancel</button>
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-purple-500 text-white hover:bg-purple-600' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Notifications;
