import React from 'react';
import Image from 'next/image';
import copyIcon from '@/app/public/copyIconWhite.svg';
import activeIcon from '@/app/public/activeIcon.svg';
import { useUserProfileContext } from "@/lib/user-profile-settings-context";

export const ContactSection: React.FC = () => {
  const { profile } = useUserProfileContext();
    return (
    <div className="mb-6">
      <h3 className="text-xl font-bold Montserrat mb-3">Contact Information</h3>

      {/* Email */}
      {profile?.email && (
        <div className="flex items-center gap-4 mb-4">
          <Image src={activeIcon} alt="Active icon" width={20} height={20} />
          <div>
            <p className="text-base flex items-center gap-2">E-mail</p>
            <div className="flex items-center">
              <a href={`mailto:${profile.email}`}  className="text-purple-500 font-semibold open-sans italic hover:underline"
              target="_blank" rel="noopener noreferrer">
              {profile.email}
              </a>
              <Image src={copyIcon} alt="Copy Icon" className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
      )}
      {/* Phone Number */}
      {profile?.phone_number && (
        <div className="flex items-center gap-4">
          <Image src={activeIcon} alt="Active icon" width={20} height={20} />
          <div>
            <p className="text-base flex items-center gap-2">Phone Number</p>
            <div className="flex items-center">
              <a href={`tel:${profile.phone_number}`} className="text-purple-500 font-semibold open-sans italic hover:underline">
                {profile.phone_number}
              </a>
              <Image src={copyIcon} alt="Copy Icon" className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
        )}
    </div>
  );
};
