'use client';

import { useState } from 'react';

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

const TimeZone: React.FC = () => {
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
    <div className='p-6 bg-white shadow-md rounded-md w-full max-w-lg mx-auto'>
      <h2 className='text-xl font-semibold mb-4'>Time Zone Settings</h2>
      <p className='text-gray-600 mb-6'>Select your preferred time zone</p>

      <div className='mb-4'>
        <label className='block text-lg font-medium mb-2'>Time Zone</label>
        <select className='w-full p-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300'>
          <option value='UTC'>UTC</option>
          <option value='EST'>Eastern Time (ET)</option>
          <option value='CST'>Central Time (CT)</option>
          <option value='MST'>Mountain Time (MT)</option>
          <option value='PST'>Pacific Time (PT)</option>
        </select>
      </div>

      <div className='flex justify-end p-4 space-x-4'>
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-gray-300 text-gray-700 hover:bg-gray-400' onClick={handleCancel}>Cancel</button>
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-purple-500 text-white hover:bg-purple-600' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default TimeZone; 