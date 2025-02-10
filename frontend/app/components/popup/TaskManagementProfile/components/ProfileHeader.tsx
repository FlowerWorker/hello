import React from 'react';
import Image from 'next/image';
import userIcon from '@/app/public/user-icons/profileImage.png';

const ProfileHeader = () => (
  <div className='h-28 bg-gradient-to-t from-[#9F61B1] to-[#181615] relative flex justify-center items-center'>
    <div className='absolute top-8'>
      <Image
        src={userIcon}
        alt='Profile Avatar'
        width={150}
        height={150}
        className='rounded-full'
      />
    </div>
  </div>
);

export default ProfileHeader;