'use client'

import React from "react";
import { ProfileSettingsProps } from "../../hooks/types";
import { useTabState } from "../../hooks/states";
import AccountSettings from "./AccountSettings/page";
import Notifications from "./Notifications/page";
import TimeZone from "./AccountSettings/TimeZone";
import Image from "next/image";
import closeIcon from "@/app/public/closeIcon.png";
import { SETTINGS_TABS } from "../../hooks/constants";
import { Button } from "../common/Button";
import { Settings } from "@mui/icons-material";

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ toggleSettings }) => {
  const { activeTab, setActiveTab } = useTabState(SETTINGS_TABS.ACCOUNT);

  return (
    <div>
      <div className="relative w-full h-40 bg-gradient-to-t from-[#B86ECE] to-[#1E191C] flex items-center justify-center">
        <nav className="flex space-x-7 z-10">
          <button 
            className={`text-lg text-white relative ${
              activeTab === SETTINGS_TABS.ACCOUNT
                ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                : ''
            }`} 
            onClick={() => setActiveTab(SETTINGS_TABS.ACCOUNT)}
          >
            Account settings
          </button>
          <button 
            className={`text-lg text-white relative ${
              activeTab === SETTINGS_TABS.NOTIFICATIONS
                ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                : ''
            }`} 
            onClick={() => setActiveTab(SETTINGS_TABS.NOTIFICATIONS)}
          >
            Notifications
          </button>
          <button 
            className={`text-lg text-white relative ${
              activeTab === SETTINGS_TABS.TIMEZONE
                ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
                : ''
            }`} 
            onClick={() => setActiveTab(SETTINGS_TABS.TIMEZONE)}
          >
            Time Zone
          </button>
        </nav>
        <div>
          <Button 
            variant="secondary" 
            className="absolute text-white top-2 right-4" 
            onClick={toggleSettings}
          >
            <Image src={closeIcon} alt='closeIcon' width={20} height={20}/>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="w-2/3 p-6 flex flex-col justify-start mt-6">
        {activeTab === SETTINGS_TABS.ACCOUNT && <AccountSettings />}
        {activeTab === SETTINGS_TABS.NOTIFICATIONS && <Notifications />}
        {activeTab === SETTINGS_TABS.TIMEZONE && <TimeZone />}
      </div>
    </div>
  )
};

export default ProfileSettings;
