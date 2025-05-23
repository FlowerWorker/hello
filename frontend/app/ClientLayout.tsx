'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/lib/auth-context';
import { UserProfileProvider } from '@/lib/user-profile-settings-context';
import { UserNotificationsProvider } from '@/lib/user-notifications-settings-context';

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <UserProfileProvider>
          <UserNotificationsProvider>
            <Toaster richColors position="top-center" />
            {children}
          </UserNotificationsProvider>
      </UserProfileProvider>
    </AuthProvider>
  );
};

export default ClientLayout;

