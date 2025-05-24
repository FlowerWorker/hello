'use client';

import { useUserNotificationsContext } from '@/lib/user-notifications-settings-context';
import { useEffect, useState } from 'react';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { getTimeZones } from '@vvo/tzdb';
import { Toast } from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/Toast';

const TimeZone: React.FC = () => {
  const { notifications, updateNotifications, refreshNotifications } = useUserNotificationsContext();
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC');
  const [autoTimeZone, setAutoTimeZone] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (notifications) {
      setSelectedTimeZone(notifications.time_zone || 'UTC');
      setAutoTimeZone(notifications.auto_time_zone || false);

      if (notifications.auto_time_zone) {
        const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setSelectedTimeZone(detectedTimeZone);
      }
    }
  }, [notifications]);

  const handleSave = async () => {
    if (!notifications) {
      showToast('Notifications data not loaded.', 'error');
      return;
    }

    const payload = { 
      ...notifications, 
      time_zone: selectedTimeZone, 
      auto_time_zone: autoTimeZone 
    };

    const success = await updateNotifications(payload);

    if (success) {
      await refreshNotifications();
      showToast('Time zone saved successfully!', 'success');
    } else {
      showToast('Failed to save time zone.', 'error');
    }
  };

  const handleCancel = () => {
    if (notifications) {
      setSelectedTimeZone(notifications.time_zone || 'UTC');
      setAutoTimeZone(notifications.auto_time_zone || false);
    }
    showToast('Changes discarded!', 'error');
  };

  return (
    <div className="w-full bg-white rounded-lg p-8 shadow space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-4">Time Zone Settings</h2>
        <p className="text-xl text-gray-600 mb-8">Select your preferred time zone below.</p>

        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Time Zone</label>
          <select
            className="w-full sm:w-80 p-3 border border-gray-300 rounded-lg text-bold focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            disabled={autoTimeZone}
          >
            {getTimeZones().map((tz) => (
              <option key={tz.name} value={tz.name}>
                {tz.name} (UTC{tz.rawOffsetInMinutes >= 0 ? '+' : ''}{tz.rawOffsetInMinutes / 60})
              </option>
            ))}
          </select>
        </div>

        {/* Auto Time Zone Checkbox */}
        <div className="flex items-center space-x-3 mt-4">
          <input
            type="checkbox"
            checked={autoTimeZone}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setAutoTimeZone(isChecked);

              if (isChecked) {
                const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                setSelectedTimeZone(detectedTimeZone);
              }
            }}
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <label className="text-lg text-gray-700">Set time zone automatically</label>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default TimeZone;