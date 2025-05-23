'use client';

import React, {useEffect, useState} from 'react';
import defaultUserIcon from '@/app/public/user-icons/profileImage.png';
import {useUserProfileContext} from '@/lib/user-profile-settings-context';

const ProfileHeader: React.FC = () => {
  const {profile} = useUserProfileContext();
  const [avatarUrl, setAvatarUrl] = useState(defaultUserIcon.src);

  useEffect(() => {
    if (!profile?.profile_picture) {
      setAvatarUrl(defaultUserIcon.src);
    } else {
      const key = encodeURIComponent(profile.profile_picture);
      const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/public/image?key=${key}&t=${Date.now()}`;
      setAvatarUrl(redirectUrl);
    }
  }, [profile?.profile_picture]);

  return (
    <div className="h-28 bg-gradient-to-t from-[#9F61B1] to-[#181615] relative flex justify-center items-center">
      <div className="absolute top-8">
        <img
          key={avatarUrl}
          src={avatarUrl}
          alt="Profile"
          width={150}
          height={150}
          className="w-[150px] h-[150px] rounded-full object-cover shadow-md border-4 border-white"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;