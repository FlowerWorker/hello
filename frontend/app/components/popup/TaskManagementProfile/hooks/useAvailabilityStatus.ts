"use client";

import { useAuth } from "@/lib/auth-context";

interface AvailabilityStatusResponse {
  status: string;
}

export const useAvailabilityStatus = () => {
  const { token } = useAuth();

  const updateAvailabilityStatus = async (status: string): Promise<boolean> => {
    if (!token) {
      console.error("Cannot update status: No token found.");
      return false;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        console.error("Failed to update status:", await response.text());
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    }
  };

  const getAvailabilityStatus = async (): Promise<string | null> => {
    if (!token) {
      console.error("Cannot update status: No token found.");
      return null;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/availability`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch status:", await response.text());
        return null;
      }
      const data: AvailabilityStatusResponse = await response.json();
      return data.status;
    } catch (error) {
      console.error("Error updating status:", error);
      return null;
    }
  };

  return { updateAvailabilityStatus, getAvailabilityStatus };
};
