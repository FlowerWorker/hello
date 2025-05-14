'use client';

import { useEffect, useState } from 'react';
import { useTabState, NOTIFICATION_TABS } from '@/app/components/popup/TaskManagementProfile/hooks';
import { useUserNotificationsContext } from '@/lib/user-notifications-settings-context';
import AccountNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/AccountNotifications';
import EmailNotifications from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/EmailNotifications';
import SoundsAppearance from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/SoundAppearance';
import { Toast } from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/Toast';

const Notifications: React.FC = () => {
  const { activeTab, setActiveTab } = useTabState(NOTIFICATION_TABS.ACCOUNT);
  const { notifications, updateNotifications, refreshNotifications } = useUserNotificationsContext();
  const [tempSettings, setTempSettings] = useState(notifications);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (notifications) {
      setTempSettings(notifications);
    }
  }, [notifications]);

  const handleSave = async () => {
    if (!tempSettings) return;
    const success = await updateNotifications(tempSettings);
    if (success) {
      await refreshNotifications();
      showToast('Settings saved successfully!', 'success');
    } else {
      showToast('Failed to save settings.', 'error');
    }
  };

  const handleCancel = () => {
    setTempSettings(notifications);
    showToast('Changes discarded!', 'error');
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto bg-gray-50">
      <div className="flex flex-col md:flex-row flex-grow w-full max-w-7xl mx-auto px-8 py-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white rounded-md shadow p-6">
          {[
            { label: 'Account Notifications', tab: NOTIFICATION_TABS.ACCOUNT },
            { label: 'Email Notifications', tab: NOTIFICATION_TABS.EMAIL },
            { label: 'Sounds Appearance', tab: NOTIFICATION_TABS.SOUNDS },
          ].map(({ label, tab }) => (
            <button
              key={tab}
              className={`w-full text-left py-3 px-4 rounded-lg text-2xl ${
                activeTab === tab
                  ? 'bg-gray-100 font-medium text-gray-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full md:w-2/3 bg-white rounded-md shadow p-8 overflow-y-auto max-w-full">
          {activeTab === NOTIFICATION_TABS.ACCOUNT && tempSettings && (
            <AccountNotifications
              tempSettings={tempSettings}
              setTempSettings={setTempSettings}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {activeTab === NOTIFICATION_TABS.EMAIL && (
            <EmailNotifications onSave={handleSave} onCancel={handleCancel} />
          )}
          {activeTab === NOTIFICATION_TABS.SOUNDS && tempSettings && (
            <SoundsAppearance
              tempSettings={tempSettings}
              setTempSettings={setTempSettings}
              onSave={handleSave}
              onCancel={handleCancel}

            />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Notifications;