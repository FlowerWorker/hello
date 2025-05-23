"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { FormField } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/FormField';
import { FORM_FIELDS } from '@/app/components/popup/TaskManagementProfile/hooks';
import { PhotoUploadContainer } from '@/lib/PhotoUploadContainer';
import { useUserProfileSettings } from "@/app/components/popup/TaskManagementProfile/hooks/userProfileSettings";
import { useUserProfileContext, UserSettings } from "@/lib/user-profile-settings-context";
import { z } from 'zod';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().min(5, 'Phone number is too short'),
  department: z.string().min(3, 'Department must be at least 3 characters'),
  jobTitle: z.string().min(3, 'Job title must be at least 3 characters'),
});

const AccountSettings: React.FC = () => {
  const { userSettings, updateUserSettings, refreshProfile } = useUserProfileContext();
  const { updateUserProfile } = useUserProfileSettings();
  const [tempSettings, setTempSettings] = useState<UserSettings | undefined>(userSettings);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    setTempSettings(userSettings);
  }, [userSettings]);

  const handleInputChange = (field: keyof UserSettings['profile'], value: string) => {
    if (!tempSettings) return;
    setTempSettings((prev) => ({
      ...prev!,
      profile: {
        ...prev!.profile,
        [field]: value,
      },
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };
const hasProfileChanged = () => {
  if (!userSettings || !tempSettings) return false;

  const original = userSettings.profile;
  const current = tempSettings.profile;

  const profileFieldsChanged =
    current.fullName !== original.fullName ||
    current.jobTitle !== original.jobTitle ||
    current.email !== original.email ||
    current.phoneNumber !== original.phoneNumber ||
    current.department !== original.department;

  const photoChanged = uploadedPhotoUrl !== null && uploadedPhotoUrl !== userSettings.profilePhoto;

  return profileFieldsChanged || photoChanged;
};
  const handleSave = async () => {
    if (!tempSettings) return;

    setErrors({});
    
    if (!hasProfileChanged()) {
      toast.info("No changes to update");
      return;
    }
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
      profile_picture: uploadedPhotoUrl || tempSettings.profilePhoto,
    };

    const success = await updateUserProfile(updatedProfile);
    if (success) {
      updateUserSettings?.({
        profile: tempSettings.profile,
        profilePhoto: uploadedPhotoUrl || tempSettings.profilePhoto,
      });
      setUploadedPhotoUrl(null);
      await refreshProfile();
      toast.success("✅ Profile updated successfully!");
    }
} 
  const handleCancel = () => {
    setTempSettings(userSettings);
    setUploadedPhotoUrl(null);
    toast.info('Changes discarded');
  };

  if (!tempSettings) return null;

  return (
    <div className="flex flex-col h-[70vh] overflow-y-auto px-6 pb-6">
      <PhotoUploadContainer onPhotoUploaded={(url) => setUploadedPhotoUrl(url)} />

      <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full">
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

      <div className="flex justify-end gap-4 mt-4 w-full">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" type="submit" onClick={handleSave}>Update Profile</Button>
      </div>
    </div>
  );
};

export default AccountSettings;

