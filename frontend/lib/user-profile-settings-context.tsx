"use client";

import { useAuth } from "@/lib/auth-context";
import { UserProfile, useUserProfileSettings } from "@/app/components/popup/TaskManagementProfile/hooks/userProfileSettings";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface UserProfileContextType {
  profile: UserProfile | null;
  refreshProfile: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { getUserProfile } = useUserProfileSettings();
  const { token } = useAuth();

  const refreshProfile = useCallback(async () => {
    if (!token) return;
    const profileData = await getUserProfile();
    if (profileData) {
      setProfile(profileData);
    }
  }, [getUserProfile, token]);

  useEffect(() => {
    if (token) {
      refreshProfile();
    }
  }, [refreshProfile, token]);

  return (
    <UserProfileContext.Provider value={{ profile, refreshProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfileContext must be used within a UserProfileProvider");
  }
  return context;
}





