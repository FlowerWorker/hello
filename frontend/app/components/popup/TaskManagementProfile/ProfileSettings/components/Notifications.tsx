'use client';

import { useTabState } from "../../hooks/states";
import AccountNotifications from "./AccountNotifications";
import EmailNotifications from "./EmailNotifications";
import SoundsAppearance from "./SoundAppearance";
import { Button } from "../../components/Button";
import { NOTIFICATION_TABS } from "../../hooks/constants";

const Notifications: React.FC = () => {
  const { activeTab, setActiveTab } = useTabState(NOTIFICATION_TABS.ACCOUNT);

  const renderContent = (): React.ReactNode => {
    switch (activeTab) {
      case "account-notifications":
        return <AccountNotifications />;
      case "email-notification":
        return <EmailNotifications />;
      case "sounds-appearance":
        return <SoundsAppearance />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-auto max-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 space-y-4 flex flex-col justify-start mt-6">
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === "active" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab("active")}
          >
            <p className="bg">Account notifications</p>
            
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === "sounds-appearance" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab("sounds-appearance")}
          >
            Sounds and appearance
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === "email-notification" ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab("email-notification")}
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
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </div>
    </div>
  );
};

export default Notifications;
