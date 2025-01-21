'use client'

import React from "react";
import { ProfileSettingsProps } from "../hooks/types";
import { useTabState } from "../hooks/states";
import AccountSettings from "./components/AccountSettings";
import Notifications from "./components/Notifications";
import TimeZone from "./components/TimeZone";
import Image from "next/image";
import closeIcon from "@/app/public/closeIcon.png";
import { SETTINGS_TABS } from "../hooks/constants";
import { Button } from "../components/Button";

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ toggleSettings }) => {
  const { activeTab, setActiveTab } = useTabState(SETTINGS_TABS.ACCOUNT);

  const renderContent = () => {
    switch (activeTab) {
      case 'account-settings':
        return <AccountSettings />;
      case 'notifications':
        return <Notifications />;
      case 'time-zone':
        return <TimeZone />;
      default:
        return null
    }
  }

  return (
    <div>
      <div className=" relative w-full h-40 bg-gradient-to-t from-[#B86ECE] to-[#1E191C] flex items-center justify-center">
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
        <div >
          <button className="absolute text-white top-2 right-4" onClick={toggleSettings}>
            <Image src={closeIcon} alt='closeIcon'width={20} height={20}/>
          </button>
        </div>
      </div>

      {renderContent()}
    </div>
  )
};

export default ProfileSettings;
