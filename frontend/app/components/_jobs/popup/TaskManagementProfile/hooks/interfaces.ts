// Component Props Interfaces
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export interface StatusSectionProps {
    status: StatusOption;
    setStatus: (status: StatusOption) => void;
}

export interface StatusDropdownProps {
    status: StatusOption;
    isStatusOpen: boolean;
    toggleStatus: () => void;
    selectStatus: (option: StatusOption) => void;
}

export interface SettingsSectionProps {
    isSettingsOpen: boolean;
    toggleSettings: () => void;
}

export interface ProfileSettingsProps {
    toggleSettings: () => void;
}

export interface TabProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export interface FormFieldProps {
    label: string;
    placeholder: string;
    descr: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NotificationProps {
    activeNotification: string;
    setActiveNotification: (notification: string) => void;
}

// Data Type Interfaces
export interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
}

// State Interfaces
export interface StatusState {
    isStatusOpen: boolean;
    toggleStatus: () => void;
}

export interface ProfileState {
    status: StatusOption;
    setStatus: (status: StatusOption) => void;
    isSettingsOpen: boolean;
    toggleSettings: () => void;
}

export interface UserSettings {
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
