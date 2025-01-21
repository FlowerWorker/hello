'use client';

import { useTabState } from "../../../hooks/states";
import AccountNotifications from "./AccountNotifications";
import EmailNotifications from "./EmailNotifications";
import SoundsAppearance from "./SoundAppearance";
import { Button } from "../../common/Button";
import { NOTIFICATION_TABS } from "../../../hooks/constants";

const Notifications: React.FC = () => {
  const { activeTab, setActiveTab } = useTabState(NOTIFICATION_TABS.ACCOUNT);

  return (
    <div className="flex flex-col h-auto max-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 space-y-4 flex flex-col justify-start mt-6">
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.ACCOUNT ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab(NOTIFICATION_TABS.ACCOUNT)}
          >
            Account notifications
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.SOUNDS ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab(NOTIFICATION_TABS.SOUNDS)}
          >
            Sounds and appearance
          </button>
          <button
            className={`w-full text-lg p-2 rounded-md text-center font-normal ${
              activeTab === NOTIFICATION_TABS.EMAIL ? "bg-[#E9E7E5] text-black" : "bg-white text-gray-600"
            }`} 
            onClick={() => setActiveTab(NOTIFICATION_TABS.EMAIL)}
          >
            Email notification
          </button>
        </div>

        {/* Content */}
        <div className="w-2/3 p-6 flex flex-col justify-start mt-6">
          {activeTab === NOTIFICATION_TABS.ACCOUNT && <AccountNotifications />}
          {activeTab === NOTIFICATION_TABS.EMAIL && <EmailNotifications />}
          {activeTab === NOTIFICATION_TABS.SOUNDS && <SoundsAppearance />}
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
