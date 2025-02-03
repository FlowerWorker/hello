'use client'

import React from 'react';
import { useProfileState, useUserSettings } from '@/app/components/popup/TaskManagementProfile/hooks';
import ProfileHeader from '@/app/components/popup/TaskManagementProfile/components/ProfileHeader';
import { StatusSection } from '@/app/components/popup/TaskManagementProfile/components/StatusSection';
import { ContactSection } from '@/app/components/popup/TaskManagementProfile/components/ContactSection';
import { SettingsSection } from '@/app/components/popup/TaskManagementProfile/components/SettingSection';

const TaskManagementProfilePage = () => {
  const { status, setStatus, isSettingsOpen, toggleSettings } = useProfileState();
  const { userSettings } = useUserSettings();

  return (
    <div className='w-80 bg-white rounded-lg shadow-lg font-sans overflow-hidden'>
        <ProfileHeader />
        
        <main className='h-126 p-6'>
            {/* Profile Information */}
            <div className='text-left mt-14 mb-4'>
                <h2 className='Montserrat text-2xl font-bold'>{userSettings.profile.fullName}</h2>
                <p className='open-sans text-xl'>{userSettings.profile.department} - {userSettings.profile.jobTitle}</p>
            </div>

            <hr className='border border-gray-200 my-5'/>

            <StatusSection status={status} setStatus={setStatus}/>
            <ContactSection />

            <hr className='border border-gray-200 my-5'/>

            <SettingsSection isSettingsOpen={isSettingsOpen} toggleSettings={toggleSettings} />
        </main>
    </div>
  )
}

export default TaskManagementProfilePage;