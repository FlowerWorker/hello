"use client";

import { useAuth } from "@/lib/auth-context";
import { useCallback } from "react";

export interface UserProfile {
  full_name: string;
  email: string;
  phone_number: string;
  department_or_team: string;
  job_title: string;
  profile_picture: string;
}

export const useUserProfileSettings = () => {
  const { token } = useAuth();

  const getUserProfile = useCallback(async (): Promise<UserProfile | null> => {
    if (!token) {
      console.warn("⚠️ No token found for profile fetch.");
      return null;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!res.ok) {
        console.error("❌ Profile fetch failed:", await res.text());
        return null;
      }

      return await res.json();
    } catch (err) {
      console.error("🔥 Error fetching profile:", err);
      return null;
    }
  }, [token]);

  const updateUserProfile = useCallback(async (payload: UserProfile): Promise<boolean> => {
    if (!token) {
      console.warn("⚠️ No token found for profile update.");
      return false;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        console.error("❌ Failed to update profile:", await res.text());
        return false;
      }

      return true;
    } catch (err) {
      console.error("🔥 Error updating profile:", err);
      return false;
    }
  }, [token]);

  return { getUserProfile, updateUserProfile };
};