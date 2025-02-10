import { useState } from 'react';
import { StatusOption, UserSettings } from '@/app/components/popup/TaskManagementProfile/hooks';

// Profile State
export const useProfileState = () => {
    const [status, setStatus] = useState<StatusOption>({
        label: 'Update my status',
        icon: null,
    });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const toggleSettings = () => setIsSettingsOpen(prev => !prev);

    return { status, setStatus, isSettingsOpen, toggleSettings };
};

// Status State
export const useStatusState = () => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const toggleStatus = () => setIsStatusOpen(prev => !prev);

    return { isStatusOpen, setIsStatusOpen, toggleStatus };
};

// Use this for both settings and notifications tabs
export const useTabState = (defaultTab: string) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    return { activeTab, setActiveTab };
};

// User Settings State
export const useUserSettings = () => {
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

    return { userSettings, updateUserSettings };
};