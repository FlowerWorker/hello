'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {useAuth} from './auth-context';
import {
  UserProfile,
  useUserProfileSettings,
} from '@/app/components/popup/TaskManagementProfile/hooks/userProfileSettings';
import {fetchCurrentUserPhoto} from '@/app/components/popup/TaskManagementProfile/hooks/photoUpload';

export interface UserSettings {
  profile: {
    fullName: string;
    jobTitle: string;
    email: string;
    department: string;
    phoneNumber: string;
  };
  profilePhoto: string;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  updateUserSettings?: (newSettings: UserSettings) => void;
  userSettings?: UserSettings;
  updateProfilePicture: (url: string) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);
export const UserProfileProvider = ({children}: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>();
  const {getUserProfile} = useUserProfileSettings();
  const {token} = useAuth();

  const updateProfilePicture = (url: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return {...prev, profile_picture: url};
    });

    setUserSettings((prev) =>
      prev
        ? {
          ...prev,
          profilePhoto: url,
        }
        : undefined
    );
  };

  const updateUserSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);

    const updatedProfile: UserProfile = {
      full_name: newSettings.profile.fullName,
      job_title: newSettings.profile.jobTitle,
      email: newSettings.profile.email,
      department_or_team: newSettings.profile.department,
      phone_number: newSettings.profile.phoneNumber,
      profile_picture: newSettings.profilePhoto,
    };

    setProfile(updatedProfile);
  };

  const extractKeyFromUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      const params = new URLSearchParams(parsed.search);
      return params.get("key") || null;
    } catch {
      return null;
    }
  };
  const refreshProfile = useCallback(async () => {
    if (!token) return;

    const [profileData, avatarUrl] = await Promise.all([
      getUserProfile(),
      fetchCurrentUserPhoto(token),
    ]);

    if (profileData) {
      const mergedProfile: UserProfile = {
        ...profileData,
        profile_picture: avatarUrl || '',
      };
      setProfile(mergedProfile);

      setUserSettings({
        profile: {
          fullName: mergedProfile.full_name,
          jobTitle: mergedProfile.job_title,
          email: mergedProfile.email,
          department: mergedProfile.department_or_team,
          phoneNumber: mergedProfile.phone_number,
        },
        profilePhoto: mergedProfile.profile_picture,
      });
    }
  }, [getUserProfile, token]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        refreshProfile,
        updateProfilePicture,
        userSettings,
        updateUserSettings,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfileContext must be used within a UserProfileProvider');
  }
  return context;
}

