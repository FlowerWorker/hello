"use client";

import React, { useState } from "react";
import ProfileHeader from "@/app/components/popup/TaskManagementProfile/components/ProfileHeader";
import { StatusSection } from "@/app/components/popup/TaskManagementProfile/components/StatusSection";
import { ContactSection } from "@/app/components/popup/TaskManagementProfile/components/ContactSection";
import { SettingsSection } from "@/app/components/popup/TaskManagementProfile/components/SettingSection";
import { useUserProfileContext } from "@/lib/user-profile-settings-context";

interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
}

const TaskManagementProfilePage = () => {
    const [status, setStatus] = useState<StatusOption>({
        label: "Update my status",
        icon: null,
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen((prev) => !prev);
    const { profile } = useUserProfileContext();

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg font-sans overflow-hidden">
            <ProfileHeader />

            <main className="h-126 p-6">
                {/* Profile Information */}
                <div className="text-left mt-14 mb-4">
                    <h2 className="Montserrat text-2xl font-bold">
                    {profile?.full_name || "User Name"}
                    </h2>
                    <p className="open-sans text-xl">
                    {profile?.department_or_team || "Team"} - {profile?.job_title || "Job Title"}
                    </p>
                </div>

                <hr className="border border-gray-200 my-5" />

                <StatusSection status={status} setStatus={setStatus} />
                <ContactSection/>

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
