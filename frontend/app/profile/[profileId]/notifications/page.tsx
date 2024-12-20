'use client';

import { useState } from "react";
import AccountNotifications from "./account-notifications/page";
import EmailNotification from "./email-notifications/page";
import SoundsAppearance from "./sounds-appearance/page";

const Notifications: React.FC = () => {
  const [active, setActive] = useState("active");

  const renderContent = (): React.ReactNode => {
    switch (active) {
      case "active":
        return <AccountNotifications />;
      case "email-notification":
        return <EmailNotification />;
      case "sounds-appearance":
        return <SoundsAppearance />;
      default:
        return null;
    }
  };

  console.log(active);

  return (
    <div className="flex flex-col h-auto max-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 space-y-4 flex flex-col justify-start mt-6">
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              active === "active" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActive("active")}
          >
            <p className="bg">Account notifications</p>
            
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              active === "sounds-appearance" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActive("sounds-appearance")}
          >
            Sounds and appearance
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              active === "email-notification" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActive("email-notification")}
          >
            Email notification
          </button>
        </div>

        {/* Content */}
        <div className="w-2/3 p-6 flex flex-col justify-start mt-6">
          {renderContent()}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end p-4 space-x-4">
        <button className="px-4 py-2 border border-black rounded-md text-black">Cancel</button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md">Save</button>
      </div>
    </div>
  );
};

export default Notifications;
