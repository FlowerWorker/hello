'use client'

import { useState } from "react";
import AccountSettings from "./account-settings/page";
import Notifications from "./notifications/page";
import TimeZone from "./time-zone/page";
import Image from "next/image";
import closeIcon from "../../public/closeIcon.png";


const ProfileId: React.FC = () => {

  const [activeTab, setIsActive] = useState('active')

  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        return <AccountSettings />;
      case 'notifications':
        return <Notifications />;
      case 'timezone':
        return <TimeZone />;
      default:
        return null
    }
  }

  return (
    <div>
      <div className=" relative w-full h-40 bg-gradient-to-t from-[#B86ECE] to-[#1E191C] flex items-center justify-center">
        <nav className="flex space-x-7 z-10">
          <button className={`text-lg text-white relative ${activeTab === 'active'
              ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
              : ''
            }`} onClick={() => setIsActive('active')}>Account settings</button>
          <button className={`text-lg text-white relative ${activeTab === 'notifications'
              ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
              : ''
            }`}  onClick={() => setIsActive('notifications')}>Notifications</button>
          <button className={`text-lg text-white relative ${activeTab === 'timezone'
              ? 'font-bold after:content-[""] after:block after:h-[2px] after:bg-white after:w-[115%] after:absolute after:left-[-8%] after:bottom-[-3px]'
              : ''
            }`}  onClick={() => setIsActive('timezone')}>Time Zone</button>
        </nav>
        <div >
          <button className="absolute text-white top-2 right-4" >
            <Image src={closeIcon} alt='closeIcon'width={20} height={20}/>
            </button>
        </div>
      </div>

      {renderContent()}
    </div>
  )
}

export default ProfileId