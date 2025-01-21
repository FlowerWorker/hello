import { useState } from 'react';
import { StatusOption } from './types';

// Profile State
export const useProfileState = () => {
    const [status, setStatus] = useState<StatusOption>({
        label: "Update my status",
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

// ... other state hooks as needed 