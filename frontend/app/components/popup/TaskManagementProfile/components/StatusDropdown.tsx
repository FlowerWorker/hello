import React from "react";
import Image from "next/image";
import {
  StatusOption,
  StatusDropdownProps,
} from "@/app/components/popup/TaskManagementProfile/hooks/constants";

import arrowUpIcon from "@/app/public/arrowUpIcon.svg";
import arrowDownIcon from "@/app/public/arrowDownIcon.svg";
import { STATUSOPTIONS } from "../hooks";

export const StatusDropdown: React.FC<StatusDropdownProps> = ({
  status,
  isStatusOpen,
  toggleStatus,
  selectStatus,
}) => {

  return (
    <div className="w-full relative">
      <button
        onClick={toggleStatus}
        className="w-full flex items-center justify-between text-xl font-semibold px-3 py-2 border border-purple-300 rounded-md hover:bg-gray-100"
      >
        <div className="flex items-center gap-2">
          {status?.icon && (
            <Image src={status.icon} alt={status.label} width={20} height={20} />
          )}
          <span>{status?.label || "Update my status"}</span>
        </div>

        <Image
          src={isStatusOpen ? arrowUpIcon : arrowDownIcon}
          alt="toggle icon"
          width={16}
          height={16}
        />
      </button>

      {/* Dropdown Options */}
      {isStatusOpen && (
        <ul className="mt-2 absolute right-0 bg-white rounded-md shadow-lg border border-gray-200 z-50 w-64">
          {STATUSOPTIONS.map((option: StatusOption) => (
            <li
              key={option.value}
              onClick={() => selectStatus(option)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option.value === status.value ? "bg-purple-100 font-semibold" : ""
              }`}
            >
              {option.icon && (
                <Image src={option.icon} alt={option.label} width={20} height={20} />
              )}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};