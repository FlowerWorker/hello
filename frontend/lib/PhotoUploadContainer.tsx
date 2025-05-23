'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useUserProfileContext } from '@/lib/user-profile-settings-context';
import { PhotoUpload } from '@/app/components/popup/TaskManagementProfile/components/settings/AccountSettings/PhotoUpload';
import profileImage from '@/app/public/user-icons/profileImage.png';
import { handlePhotoUpload } from '@/app/components/popup/TaskManagementProfile/hooks/photoUpload';
import { toast } from 'sonner';

interface PhotoUploadContainerProps {
  onPhotoUploaded?: (url: string) => void;
}

function extractKeyFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const params = new URLSearchParams(parsed.search);
    return params.get('key') || null;
  } catch {
    return null;
  }
}

export const PhotoUploadContainer: React.FC<PhotoUploadContainerProps> = ({
  onPhotoUploaded,
}) => {
  const { token } = useAuth();
  const {
    profile,
    updateProfilePicture,
    refreshProfile,
    updateUserSettings,
    userSettings,
  } = useUserProfileContext();
  const [uploading, setUploading] = useState(false);
 
  const onImageUpload = async (file: File | null) => {
    
    if (!file || !token) return;
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
     if (!allowedTypes.includes(file.type)) {
        toast.error("File must be a valid image (JPEG, PNG, WebP)");
        return;
      }
    if (file.size > maxSize) {
      toast.error('Image must be under 10MB.');
      return;
    }
      setUploading(true);
  try {
    const uploadedPhotoUrl = await handlePhotoUpload(file, token);
    if(!uploadedPhotoUrl) {
      toast.error("Upload failed.");
      return;
    }
    const key = extractKeyFromUrl(uploadedPhotoUrl) || uploadedPhotoUrl;
    updateProfilePicture(key);
    onPhotoUploaded?.(key);

    if (userSettings && updateUserSettings) {
      updateUserSettings({ ...userSettings, profilePhoto: key });
    }
    await refreshProfile();
  } catch (e) {
    console.error('❌ Upload error:', e);
    toast.error("Upload failed.");
  } finally {
    setUploading(false);
  }
};

  return (
    <>
      <PhotoUpload
        currentImage={profile?.profile_picture ?? profileImage.src}
        onImageUpload={onImageUpload}
      />
      {uploading && <p className="text-sm text-gray-600">Uploading photo...</p>}
    </>
  );
};


