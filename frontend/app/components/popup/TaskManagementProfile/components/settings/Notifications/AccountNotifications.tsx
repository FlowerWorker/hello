'use client';

import { UserNotifications } from '@/app/components/popup/TaskManagementProfile/hooks/userNotificationsSettings';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { Toast } from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/Toast';
import { useState } from 'react';

interface AccountNotificationsProps {
  tempSettings: UserNotifications | null;
  setTempSettings: React.Dispatch<React.SetStateAction<UserNotifications | null>>;
  onSave: () => void;
  onCancel: () => void;
}

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

const notificationCheckboxList = [
  { id: 1, key: 'all_new_messages', label: 'All new messages' },
  { id: 2, key: 'direct_messages', label: 'Direct messages and mentions' },
  { id: 3, key: 'thread_replies', label: `Notify me about replies to threads I'm following` },
];

const timeToMinutes = (time: string) => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const AccountNotifications: React.FC<AccountNotificationsProps> = ({
  tempSettings,
  setTempSettings,
  onSave,
  onCancel,
}) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!tempSettings) return null;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCheckboxChange = (field: keyof UserNotifications, value: boolean) => {
    setTempSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSelectChange = (field: keyof UserNotifications, value: string) => {
    setTempSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSaveClick = () => {
    const start = tempSettings.start_hour;
    const end = tempSettings.end_hour;

    if (start && end) {
      const startMins = timeToMinutes(start);
      const endMins = timeToMinutes(end);

      if (startMins >= endMins) {
        showToast('❌ Start time must be before end time.', 'error');
        return;
      }
    }

    onSave();
  };

  return (
    <div className="w-full bg-white rounded-lg p-8 shadow space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">Notify me about</h2>
        <div className="space-y-3">
          {notificationCheckboxList.map((item) => (
            <label key={item.id} className="flex items-center space-x-2 text-xl">
              <input
                type="checkbox"
                checked={!!tempSettings[item.key as keyof UserNotifications]}
                onChange={(e) => handleCheckboxChange(item.key as keyof UserNotifications, e.target.checked)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Notification schedule</h2>
        <p className="text-xl text-gray-600 mb-3">
          You&apos;ll only receive notifications in the hours you choose. Outside of those times, notifications will be paused.
        </p>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-medium text-lg">Allow notifications:</span>
          <select
            value={tempSettings.schedule || ''}
            onChange={(e) => handleSelectChange('schedule', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 font-semibold"
          >
            <option value="Every day">Every day</option>
            <option value="Weekdays">Weekdays</option>
          </select>

          <span className="font-medium text-lg">From</span>
          <select
            value={tempSettings.start_hour || ''}
            onChange={(e) => handleSelectChange('start_hour', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-lg font-semibold"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <span className="font-medium text-lg">To</span>
          <select
            value={tempSettings.end_hour || ''}
            onChange={(e) => handleSelectChange('end_hour', e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-lg font-semibold"
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Set a default time for remind notifications</h2>
        <select
          value={tempSettings.remind_at || ''}
          onChange={(e) => handleSelectChange('remind_at', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-1">When I&apos;m not active on desktop…</h2>
        <p className="text-xl text-gray-600 mb-2">Send notifications to my mobile devices:</p>
        <select
          value={tempSettings.mobile_frequency || ''}
          onChange={(e) => handleSelectChange('mobile_frequency', e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-lg font-semibold"
        >
          <option value="Every day">Every day</option>
          <option value="Weekdays">Weekdays</option>
          <option value="Never">Never</option>
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={tempSettings.mute_all_sounds || false}
            onChange={(e) => handleCheckboxChange('mute_all_sounds', e.target.checked)}
            className="form-checkbox h-5 w-5 text-purple-600"
          />
          <span className="text-xl">Mute all message sounds from FlowerWorker</span>
        </label>
      </div>

      <div className="flex justify-end space-x-4 text-xl">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AccountNotifications;