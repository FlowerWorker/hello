"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { UserNotifications, useUserNotificationsSettings } from "@/app/components/popup/TaskManagementProfile/hooks/userNotificationsSettings";


interface UserNotificationsContextType {
  notifications: UserNotifications | null;
  refreshNotifications: () => void;
  updateNotifications: (payload: UserNotifications) => Promise<boolean>;
}

const UserNotificationsContext = createContext<UserNotificationsContextType | undefined>(undefined);

export const UserNotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<UserNotifications | null>(null);
  const { getUserNotifications, updateUserNotifications } = useUserNotificationsSettings();
  const { token } = useAuth();

  const refreshNotifications = useCallback(async () => {
    if (!token) return;
    const notifData = await getUserNotifications();
    if (notifData) {
      setNotifications(prev => JSON.stringify(prev) !== JSON.stringify(notifData) ? { ...notifData } : prev);
    }
  }, [getUserNotifications, token]);

  useEffect(() => {
    if (token) {
      refreshNotifications();
    }
  }, [refreshNotifications, token]);

  return (
    <UserNotificationsContext.Provider value={{ notifications, refreshNotifications, updateNotifications: updateUserNotifications }}>
      {children}
    </UserNotificationsContext.Provider>
  );
};

export function useUserNotificationsContext() {
  const context = useContext(UserNotificationsContext);
  if (!context) {
    throw new Error("useUserNotificationsContext must be used within a UserNotificationsProvider");
  }
  return context;
}
