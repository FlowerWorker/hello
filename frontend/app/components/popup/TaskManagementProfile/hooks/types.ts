export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    className?: string;
}

export interface StatusOption {
    value?: string;
    label: string;
    icon: string | null;
}

export interface TabProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export interface NotificationProps {
    activeNotification: string;
    setActiveNotification: (notification: string) => void;
}

export interface SettingsState {
    settings: UserSettings;
    updateSettings: (newSettings: Partial<UserSettings>) => void;
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