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
export type FormFieldKey =
  | 'fullName'
  | 'jobTitle'
  | 'email'
  | 'department'
  | 'phoneNumber';

  export const FORM_FIELDS: {
    id: number;
    key: FormFieldKey;
    label: string;
    placeholder: string;
    descr: string;
  }[] = [
    {
      id: 1,
      key: 'fullName',
      label: 'Full name',
      placeholder: 'Enter your name...',
      descr:
        'Your name may appear around FlowerWork where you contribute or are mentioned. You can change it at any time.',
    },
    {
      id: 2,
      key: 'jobTitle',
      label: 'Job title',
      placeholder: 'Enter your job title...',
      descr:
        'Your Job title may appear around FlowerWork where you contribute or are mentioned. You can change it at any time.',
    },
    {
      id: 3,
      key: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      descr: 'All our notifications will be sent to this email.',
    },
    {
      id: 4,
      key: 'department',
      label: 'Department or team',
      placeholder: 'Enter your Department or team',
      descr:
        'Your Department or team may appear around FlowerWork where you contribute.',
    },
    {
      id: 5,
      key: 'phoneNumber',
      label: 'Phone number',
      placeholder: 'Enter your phone number',
      descr:
        'We will contact you regarding any updated with the projects you are a part of. Your phone number will be visible for your team members.',
    },
  ];
  