export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    className?: string;
}

// Data Type Interfaces
export interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
}

export interface StatusState {
    isStatusOpen: boolean;
    toggleStatus: () => void;
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

// State Interfaces (for hooks)
export interface ProfileState {
    status: StatusOption;
    setStatus: (status: StatusOption) => void;
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

export interface UserSettings {
    profile: {
        fullName: string;
        jobTitle: string;
        email: string;
        department: string;
        phoneNumber: string;
      };
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

export interface FormFieldProps {
    label: string,
    placeholder: string,
    descr: string
}

export interface NotificationProps {
    activeNotification: string;
    setActiveNotification: (notification: string) => void;
}