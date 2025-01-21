import activeIcon from "@/app/public/activeIcon.svg";

export const TABS = {
    ACCOUNT: 'account-settings',
    NOTIFICATIONS: 'notifications',
    TIMEZONE: 'time-zone',
} as const;

export const NOTIFICATION_SECTIONS = {
    ACCOUNT: 'account-notifications',
    SOUNDS: 'sounds-and-appearance',
    EMAIL: 'email-notification',
} as const;

export const STATUSOPTIONS = [
    { value: 'Active', label: 'Active', icon: activeIcon },
    { value: 'Busy', label: 'Busy', icon: activeIcon },
    { value: 'On a call', label: 'On a call', icon: activeIcon },
    { value: 'In a meeting', label: 'In a meeting', icon: activeIcon },
    { value: 'Out for lunch', label: 'Out for lunch', icon: activeIcon },
];
