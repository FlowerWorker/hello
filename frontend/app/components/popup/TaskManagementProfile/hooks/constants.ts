import activeIcon from "@/app/public/activeIcon.svg";

export const SETTINGS_TABS = {
    ACCOUNT: 'account-settings',
    NOTIFICATIONS: 'notifications',
    TIMEZONE: 'time-zone',
} as const;

export const NOTIFICATION_TABS = {
    ACCOUNT: 'account-notifications',
    EMAIL: 'email-notification',
    SOUNDS: 'sounds-appearance',
} as const;

export const STATUSOPTIONS = [
    { value: 'Active', label: 'Active', icon: activeIcon },
    { value: 'Busy', label: 'Busy', icon: activeIcon },
    { value: 'On a call', label: 'On a call', icon: activeIcon },
    { value: 'In a meeting', label: 'In a meeting', icon: activeIcon },
    { value: 'Out for lunch', label: 'Out for lunch', icon: activeIcon },
];
