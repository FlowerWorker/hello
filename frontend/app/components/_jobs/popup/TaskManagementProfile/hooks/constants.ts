import activeIcon from '@/app/public/activeIcon.svg';

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
] as const;

export const FORM_FIELDS = [
    { 
        id: 1, 
        label: 'Full name', 
        placeholder: 'Enter your name...', 
        descr: 'Your name may appear around Gaddr where you contribute or are mentioned. You can change it at any time.' 
    },
    { 
        id: 2, 
        label: 'Job title', 
        placeholder: 'Enter your job title...', 
        descr: 'Your Job title may appear around Gaddr where you contribute or are mentioned. You can change it at any time.' 
    },
    { 
        id: 3, 
        label: 'Email', 
        placeholder: 'Enter your email', 
        descr: 'All our notifications will be sent to this email.' 
    },
    { 
        id: 4, 
        label: 'Department or team', 
        placeholder: 'Enter your Department or team', 
        descr: 'Your Department or team may appear around Gaddr where you contribute.' 
    },
    { 
        id: 5, 
        label: 'Phone number', 
        placeholder: 'Enter your phone number', 
        descr: 'We will contact you regarding any updated with the projects you are a part of. Your phone number will be visible for your team members.' 
    },
] as const;