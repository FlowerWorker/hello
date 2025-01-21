"use client"

import React from "react";
import {useProfileState } from "@/app/components/popup/TaskManagementProfile/hooks/useProfileState";
import ProfileHeader from "@/app/components/popup/TaskManagementProfile/components/ProfileHeader";
import { StatusSection } from "@/app/components/popup/TaskManagementProfile/components/StatusSection";
import { ContactSection } from "@/app/components/popup/TaskManagementProfile/components/ContactSection";
import { SettingsSection } from "@/app/components/popup/TaskManagementProfile/components/SettingSection";

const TaskManagementProfilePage = () => {
  const { 
    status, 
    setStatus, 
    isSettingsOpen, 
    toggleSettings 
  } = useProfileState();

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg font-sans overflow-hidden">
        <ProfileHeader />
        
        <main className="h-126 p-6">
            {/* Profile Information */}
            <div className="text-left mt-14 mb-4">
                <h2 className="Montserrat text-2xl font-bold">User Name</h2>
                <p className="open-sans text-xl">Team - Job title</p>
            </div>

            <hr className="border border-gray-200 my-5"/>

            <StatusSection status={status} setStatus={setStatus}/>
            <ContactSection />

            <hr className="border border-gray-200 my-5"/>

            <SettingsSection isSettingsOpen={isSettingsOpen} toggleSettings={toggleSettings} />
        </main>
    </div>
  )
}

export default TaskManagementProfilePage;