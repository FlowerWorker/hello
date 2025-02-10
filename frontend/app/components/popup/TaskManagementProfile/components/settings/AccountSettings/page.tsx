'use client';

import React, { useState } from 'react';
import { PhotoUpload } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/PhotoUpload';
import { FormField } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/FormField';

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

const FORM_FIELDS = [
  { 
    id: 1, 
    label: 'Full name', 
    placeholder: 'Enter your name...', 
    descr: 'Your name may appear around FlowerWork where you contribute or are mentioned. You can change it at any time.' 
  },
  { 
    id: 2, 
    label: 'Job title', 
    placeholder: 'Enter your job title...', 
    descr: 'Your Job title may appear around FlowerWork where you contribute or are mentioned. You can change it at any time.' 
  },
  { 
    id: 3, 
    label: 'Email', 
    placeholder: 'Enter your email', 
    descr: 'All our notifications will be sent to this email.' 
  },
  { 
    id: 4, 
    label: 'Department or team', 
    placeholder: 'Enter your Department or team', 
    descr: 'Your Department or team may appear around FlowerWork where you contribute.' 
  },
  { 
    id: 5, 
    label: 'Phone number', 
    placeholder: 'Enter your phone number', 
    descr: 'We will contact you regarding any updated with the projects you are a part of. Your phone number will be visible for your team members.' 
  },
];

const AccountSettings: React.FC = () => {
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

  const [tempSettings, setTempSettings] = useState(userSettings);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleInputChange = (field: keyof UserSettings['profile'], value: string) => {
    setTempSettings({
      ...tempSettings,
      profile: {
        ...tempSettings.profile,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    updateUserSettings({
      ...tempSettings,
      profilePhoto: uploadedImage ? URL.createObjectURL(uploadedImage) : tempSettings.profilePhoto,
    });
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setTempSettings(userSettings);
    setUploadedImage(null);
    alert('Changes discarded!');
  };

  return (
    <div className='flex flex-col items-start p-10'>
      <PhotoUpload onImageUpload={setUploadedImage} currentImage={userSettings.profilePhoto || ''}/>
      <div className='py-12 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full'>
        {FORM_FIELDS.map((field) => {
          const fieldKey = field.label.toLowerCase().replace(/\s+/g, '') as keyof UserSettings['profile'];
          return (
            <FormField
              key={field.id}
              {...field}
              value={userSettings.profile[fieldKey]}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            />
          );
        })}
      </div>
      <div className='flex justify-end gap-4 mt-4 w-full'>
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-gray-300 text-gray-700 hover:bg-gray-400' onClick={handleCancel}>Cancel</button>
        <button className='px-4 py-2 rounded transition-colors duration-200 bg-purple-500 text-white hover:bg-purple-600' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AccountSettings; 