"use client";

import React, { useState } from "react";
import ProfileHeader from "@/app/components/popup/TaskManagementProfile/components/ProfileHeader";
import { StatusSection } from "@/app/components/popup/TaskManagementProfile/components/StatusSection";
import { ContactSection } from "@/app/components/popup/TaskManagementProfile/components/ContactSection";
import { SettingsSection } from "@/app/components/popup/TaskManagementProfile/components/SettingSection";

interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
}

interface UserSettings {
    profile: {
        fullName: string;
        jobTitle: string;
        email: string;
        department: string;
        phoneNumber: string;
    };
    profilePhoto: string;
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

const TaskManagementProfilePage = () => {
    const [status, setStatus] = useState<StatusOption>({
        label: "Update my status",
        icon: null,
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

    const [userSettings, setUserSettings] = useState<UserSettings>({
        profile: {
            fullName: "User Name", // Default values
            jobTitle: "Job title",
            email: "username@gmail.com",
            department: "Team",
            phoneNumber: "01231234532",
        },
        profilePhoto: "",
        notifications: {
            allNewMessages: true,
            directMessages: true,
            threadReplies: false,
            schedule: "Every day",
            notificationHours: {
                start: "9:00 AM",
                end: "5:00 PM",
            },
        },
    });

    const updateUserSettings = (newSettings: Partial<UserSettings>) => {
        setUserSettings((prev) => ({ ...prev, ...newSettings }));
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg font-sans overflow-hidden">
            <ProfileHeader />

            <main className="h-126 p-6">
                {/* Profile Information */}
                <div className="text-left mt-14 mb-4">
                    <h2 className="Montserrat text-2xl font-bold">
                        {userSettings.profile.fullName}
                    </h2>
                    <p className="open-sans text-xl">
                        {userSettings.profile.department} - {userSettings.profile.jobTitle}
                    </p>
                </div>

                <hr className="border border-gray-200 my-5" />

                <StatusSection status={status} setStatus={setStatus} />
                <ContactSection />

                <hr className="border border-gray-200 my-5" />

                <SettingsSection
                    isSettingsOpen={isSettingsOpen}
                    toggleSettings={toggleSettings}
                />
            </main>
        </div>
    );
};

export default TaskManagementProfilePage;
