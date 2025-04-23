'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { PhotoUpload } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/PhotoUpload';
import { FormField } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/FormField';
import { useUserSettings, UserSettings, FORM_FIELDS } from '@/app/components/popup/TaskManagementProfile/hooks';
import { useUserProfileSettings } from "@/app/components/popup/TaskManagementProfile/hooks/userProfileSettings";
import { useUserProfileContext } from "@/lib/user-profile-settings-context";
import { z } from 'zod';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(5, 'Phone number is too short'),
  department: z.string().min(3, 'Department must be at least 3 characters'),
  jobTitle: z.string().min(3, 'Job title must be at least 3 characters'),
});

const AccountSettings: React.FC = () => {
  const { userSettings, updateUserSettings } = useUserSettings();
  const [tempSettings, setTempSettings] = useState(userSettings);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const { updateUserProfile } = useUserProfileSettings();
  const { refreshProfile } = useUserProfileContext();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof UserSettings['profile'], value: string) => {
    setTempSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSave = async () => {
    setErrors({});
    
    const result = profileSchema.safeParse(tempSettings.profile);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach(err => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const updatedProfile = {
      full_name: tempSettings.profile.fullName,
      email: tempSettings.profile.email,
      phone_number: tempSettings.profile.phoneNumber,
      department_or_team: tempSettings.profile.department,
      job_title: tempSettings.profile.jobTitle,
      profile_picture: tempSettings.profilePhoto,
    };

    const success = await updateUserProfile(updatedProfile);
    if (success) {
      updateUserSettings({ ...tempSettings });
      await refreshProfile();
      alert("Profile updated successfully!");
    } else {
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setTempSettings(userSettings);
    setUploadedImage(null);
    alert('Changes discarded!');
  };

  return (
    <div className='flex flex-col items-start p-10'>
      <PhotoUpload onImageUpload={setUploadedImage} currentImage={userSettings.profilePhoto || ''} />

      <div className='py-12 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full'>
        {FORM_FIELDS.map((field) => (
          <FormField
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            descr={field.descr}
            value={tempSettings.profile[field.key]}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            type={field.key === 'email' ? 'email' : field.key === 'phoneNumber' ? 'tel' : 'text'}
            error={errors[field.key]}
          />
        ))}
      </div>

      <div className='flex justify-end gap-4 mt-4 w-full'>
        <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
        <Button variant='primary' type='submit' onClick={handleSave}>Update Profile</Button>
      </div>
    </div>
  );
};

export default AccountSettings;