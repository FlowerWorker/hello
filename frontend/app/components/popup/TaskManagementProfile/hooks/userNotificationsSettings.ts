"use client";

import { useAuth } from "@/lib/auth-context";
import { useCallback } from "react";

export interface UserNotifications {
  all_new_messages?: boolean;
  direct_messages?: boolean;
  thread_replies?: boolean;
  schedule?: string;
  start_hour?: string;
  end_hour?: string;
  remind_at?: string;
  mobile_frequency?: string;
  incoming_pref?: string;
  outgoing_pref?: string;
  mute_all_sounds?: boolean;
  email_frequency?: string;
  time_zone?: string;
  incoming_sound?: string;
  outgoing_sound?: string;
  auto_time_zone: boolean;
}

export const useUserNotificationsSettings = () => {
  const { token } = useAuth();

  const getUserNotifications = useCallback(async (): Promise<UserNotifications| null> => {
    if (!token) {
      console.warn("⚠️ No token found for notifications fetch.");
      return null;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
     
      if (!res.ok) {
        console.error("❌ Notifications fetch failed:", await res.text());
        return null;
      }

      return await res.json();
    } catch (err) {
      console.error("🔥 Error fetching notifications:", err);
      return null;
    }
  }, [token]);

  const updateUserNotifications = useCallback(async (payload: UserNotifications): Promise<boolean> => {
   
    if (!token) {
      console.warn("⚠️ No token found for notifications update.");
      return false;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("❌ Failed to update notifications:", await res.text());
        return false;
      }

      return true;
    } catch (err) {
      console.error("🔥 Error updating notifications:", err);
      return false;
    }
  }, [token]);

  const sendTestEmail = useCallback(async (): Promise<boolean> => {
   
    if (!token) {
      console.warn("⚠️ No token found for notifications update.");
      return false;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/notifications/send-test-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      return res.ok;
    } catch (error) {
      console.error("Sending test email failed", error);
      return false;
    }
  }, [token]);

  return { getUserNotifications, updateUserNotifications, sendTestEmail };
};
