'use client';

import { Button } from '../../common/Button';
import { PhotoUpload } from './PhotoUpload';
import { FormField } from './FormField';
import { useUserSettings } from '../../../hooks/states';
import { UserSettings } from '../../../hooks/types';
import { FORM_FIELDS } from '../../../hooks/constants';

const AccountSettings: React.FC = () => {
  const { userSettings, updateUserSettings } = useUserSettings();

  const handleInputChange = (field: keyof UserSettings['profile'], value: string) => {
    updateUserSettings({
      profile: {
        ...userSettings.profile,
        [field]: value
      }
    });
  };

  return (
    <div className="flex flex-col items-start p-10">
      <PhotoUpload />
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
        {FORM_FIELDS.map((field) => {
          const fieldKey = field.label.toLowerCase().replace(/\s+/g, '') as keyof UserSettings['profile'];
          return (
            <FormField
              key={field.id}
              {...field}
              value={userSettings.profile[fieldKey]}
              onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            />
          );
        })}
      </div>
      <div className="flex justify-end gap-4 mt-4 w-full">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Update Profile</Button>
      </div>
    </div>
  );
};

export default AccountSettings; 