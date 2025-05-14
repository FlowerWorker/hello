'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { Toast } from '@/app/components/popup/TaskManagementProfile/components/settings/Notifications/Toast';
import { useUserNotificationsSettings } from '@/app/components/popup/TaskManagementProfile/hooks/userNotificationsSettings';

interface EmailNotificationsProps {
  onSave: () => void;
  onCancel: () => void;
}

const EmailNotifications: React.FC<EmailNotificationsProps> = ({ onSave, onCancel }) => {
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { sendTestEmail } = useUserNotificationsSettings();

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendTestEmail = async () => {
    const success = await sendTestEmail();

    if (success) {
      showToast("Test email sent successfully!", "success");
    } else {
      showToast("Failed to send test email.", "error");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-8 shadow space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-4">Email Notifications</h2>
        <p className="text-xl text-gray-600 mb-8">
          Receive emails about unread messages after a period of inactivity.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
          <select className="form-select w-full sm:w-60 p-3 border border-gray-300 rounded-md text-xl">
            <option value="Every day">Every day</option>
            <option value="Weekdays">Weekdays</option>
          </select>

          <Button variant="primary" onClick={handleSendTestEmail}>
            Send Test Email
          </Button>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div className="flex justify-end space-x-4 text-xl">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default EmailNotifications;