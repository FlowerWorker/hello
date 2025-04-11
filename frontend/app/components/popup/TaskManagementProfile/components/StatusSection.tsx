import React, { useEffect } from "react";
import { StatusDropdown } from "@/app/components/popup/TaskManagementProfile/components/StatusDropdown";
import { useAvailabilityStatus } from "../hooks/useAvailabilityStatus";
import { useStatusContext } from "@/lib/status-context";
import { StatusOption } from "@/app/components/popup/TaskManagementProfile/hooks/constants";
import { useStatusState } from "@/app/components/popup/TaskManagementProfile/hooks/states";

export const StatusSection: React.FC = () => {
  const { isStatusOpen, toggleStatus } = useStatusState();
  const { updateAvailabilityStatus } = useAvailabilityStatus();
  const { status, setStatus } = useStatusContext();

  const handleAvailabilityStatusChange = async (option: StatusOption) => {
    setStatus(option);
    toggleStatus();

    if (option.value) {
      await updateAvailabilityStatus(option.value);
    }
  };

  return (
    <div className="relative mt-4 mb-6">
      <StatusDropdown
        status={status}
        isStatusOpen={isStatusOpen}
        toggleStatus={toggleStatus}
        selectStatus={handleAvailabilityStatusChange}
      />
      <p className="text-base text-gray-500 mt-2">
        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} local time
      </p>
    </div>
  );
};