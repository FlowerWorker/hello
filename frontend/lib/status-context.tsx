"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { StatusOption, STATUSOPTIONS } from "@/app/components/popup/TaskManagementProfile/hooks/constants";
import { useAvailabilityStatus } from "@/app/components/popup/TaskManagementProfile/hooks/useAvailabilityStatus";

interface StatusContextType {
  status: StatusOption;
  setStatus: React.Dispatch<React.SetStateAction<StatusOption>>;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<StatusOption>(STATUSOPTIONS[0]);
  const { getAvailabilityStatus } = useAvailabilityStatus();
 
const getStatusOption = (value: string): StatusOption => {
  return STATUSOPTIONS.find(option => option.value === value) || STATUSOPTIONS[0]; 
};

useEffect(() => {
    const fetchStatus = async () => {
      const statusValue = await getAvailabilityStatus();
      if (!statusValue) return;
      setStatus(getStatusOption(statusValue));
    };
    fetchStatus();
  }, [getAvailabilityStatus]);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export function useStatusContext() {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatusContext must be used within a StatusProvider");
  }
  return context;
}



