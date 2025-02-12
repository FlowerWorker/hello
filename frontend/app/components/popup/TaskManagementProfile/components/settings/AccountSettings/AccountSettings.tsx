'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import { PhotoUpload } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/PhotoUpload';
import { FormField } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/FormField';
import { useUserSettings, UserSettings, FORM_FIELDS } from '@/app/components/popup/TaskManagementProfile/hooks';

const AccountSettings: React.FC = () => {
    const { userSettings, updateUserSettings } = useUserSettings();
    const [tempSettings, setTempSettings] = useState(userSettings);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);


    const handleInputChange = (field: keyof UserSettings['profile'], value: string) => {
        setTempSettings({
            ...tempSettings,
            profile: {
                ...tempSettings.profile,
                [field]: value,
            },
        });
    };

    const handleSave = () => {
        updateUserSettings({
            ...tempSettings,
            profilePhoto: uploadedImage ? URL.createObjectURL(uploadedImage) : tempSettings.profilePhoto,
        });
        alert('Profile updated successfully!');
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
            <div className='flex justify-end gap-4 mt-4 w-full'>
                <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
                <Button variant='primary' type='submit' onClick={handleSave}>Update Profile</Button>
            </div>
        </div>
    );
};

export default AccountSettings; 