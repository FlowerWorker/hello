'use client';

import React from 'react';
import { UserNotifications } from '@/app/components/popup/TaskManagementProfile/hooks/userNotificationsSettings';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';

interface Props {
  tempSettings: UserNotifications | null;
  setTempSettings: React.Dispatch<React.SetStateAction<UserNotifications | null>>;
  onSave: () => void;
  onCancel: () => void;
}

const soundOptions = ['Plop', 'Hi', 'Horn', 'Knock', 'Important'];

const SoundsAppearance: React.FC<Props> = ({ tempSettings, setTempSettings, onSave, onCancel }) => {
  if (!tempSettings) return null;

  const handleSelectChange = (field: keyof UserNotifications, value: string) => {
    setTempSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleCheckboxChange = (field: keyof UserNotifications, value: boolean) => {
    setTempSettings((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const playSound = (sound: string) => {
    const audio = new Audio(`/sounds/${sound.toLowerCase()}.mp3`);
    audio.play().catch((err) => console.warn('Audio error:', err));
  };

  return (
    <div className="w-full bg-white rounded-lg p-8 shadow space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold mb-4">Sound and Appearance</h2>
        <p className="text-xl text-gray-600 mb-8">Personalize how notifications sound and look.</p>

        {/* Incoming Sound */}
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Incoming Message Sound</label>
          <div className="flex items-center gap-4">
            <select
              value={tempSettings.incoming_sound || ''}
              onChange={(e) => handleSelectChange('incoming_sound', e.target.value)}
              className="w-full sm:w-60 p-3 border border-gray-300 rounded-md font-semibold text-lg"
            >
              {soundOptions.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
            </select>
            <Button variant="primary" onClick={() => playSound(tempSettings.incoming_sound || 'Plop')}>
              🔊 Test
            </Button>
          </div>
        </div>

        {/* Outgoing Sound */}
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Outgoing Message Sound</label>
          <div className="flex items-center gap-4">
            <select
              value={tempSettings.outgoing_sound || ''}
              onChange={(e) => handleSelectChange('outgoing_sound', e.target.value)}
              className="w-full sm:w-60 p-3 border border-gray-300 rounded-md text-lg font-semibold"
            >
              {soundOptions.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
            </select>
            <Button variant="primary" onClick={() => playSound(tempSettings.outgoing_sound || 'Important')}>
              🔊 Test
            </Button>
          </div>
        </div>

        {/* Frequencies */}
        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Incoming Messages Frequency</label>
          <select
            value={tempSettings.incoming_pref || ''}
            onChange={(e) => handleSelectChange('incoming_pref', e.target.value)}
            className="w-full sm:w-60 p-3 border border-gray-300 rounded-md font-semibold text-lg"
          >
            <option value="Every day">Every day</option>
            <option value="Weekdays">Weekdays</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-xl font-medium mb-2">Outgoing Messages Frequency</label>
          <select
            value={tempSettings.outgoing_pref || ''}
            onChange={(e) => handleSelectChange('outgoing_pref', e.target.value)}
            className="w-full sm:w-60 p-3 border border-gray-300 rounded-md font-semibold text-lg"
          >
            <option value="Every day">Every day</option>
            <option value="Weekdays">Weekdays</option>
          </select>
        </div>

        {/* Mute All */}
        <div className="flex items-center mt-4">
          <input
            id="mute"
            type="checkbox"
            checked={tempSettings.mute_all_sounds || false}
            onChange={(e) => handleCheckboxChange('mute_all_sounds', e.target.checked)}
            className="h-5 w-5 text-purple-600"
          />
          <label htmlFor="mute" className="ml-3 text-gray-800 text-base text-xl">
            Mute all message sounds from FlowerWorker
          </label>
        </div>
      </div>

      {/* Save / Cancel Buttons */}
      <div className="flex justify-end space-x-4 text-lg font-bold">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SoundsAppearance;