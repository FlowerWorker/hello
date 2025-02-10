"use client";

import { useState } from "react";
import Image from "next/image";
import logoIcon from "@/app/public/LOGO.svg";
import userIconPlaceholder from "@/app/public/userIconPlaceholder.svg";
import activeIcon from "@/app/public/activeIcon.svg";
import activeNotificationIcon from "@/app/public/activeNotification.svg";
import userIcon from "@/app/public/user-icons/userIcon3.svg";
import TaskManagementProfile from "../popup/TaskManagementProfile/page";

const TaskManagementNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  return (
    <div className="w-full">
      <div
        className="flex flex-col sm:flex-row w-full min-h-[75px]
     justify-between items-center bg-[#181615] lg:gap-2 px-2 pb-2"
      >
        {/* Left side */}
        <div className="flex px-4 gap-4 md:gap-16 flex-col sm:flex-row">
          <div>
            <Image
              src={logoIcon}
              alt="flower icon"
              className="min-w-[150px]"
              priority
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex gap-6 px-2 min-w-[80px] mt-4 sm:mt-0 items-center">
          <Image src={activeNotificationIcon} alt="active notification icon" />

          <Image src={activeIcon} alt="active icon" />

          <Image
            src={userIcon}
            alt="user icon"
            onClick={toggleProfile}
            className="w-10 h-10 sm:h-auto sm:w-auto"
          />
        </div>
      </div>

      {isProfileOpen && (
        <div className="absolute right-2 top-[85px] bg-white shadow-lg rounded-lg z-50">
          <TaskManagementProfile />
        </div>
      )}

      <div className="flex w-full min-h-[49px] px-4 items-center bg-[#282624]">
        <p className="font-bold text-lg py-2 text-white">Workspaces</p>
      </div>
    </div>
  );
};

export default TaskManagementNavbar;