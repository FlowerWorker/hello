'use client';

import React from 'react';
import Image from 'next/image';
import emailIcon from '@/app/public/activeIcon.svg';
import copyIcon from '@/app/public/copyIconWhite.svg';
import { useUserProfileContext } from "@/lib/user-profile-settings-context";

export const ContactSection: React.FC = () => {
  const { profile } = useUserProfileContext();
  if (!profile) return null;
  const userEmail = profile.email;
  const phoneNumber = profile.phone_number;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold Montserrat mb-3">Contact Information</h3>

      {/* Email */}
      {userEmail && (
        <div className="flex items-center gap-4 mb-4">
          <Image src={emailIcon} alt="Email icon" width={20} height={20} />
          <div>
            <p className="text-base flex items-center gap-2">E-mail</p>
            <div className="flex items-center">
              <a
                href={`mailto:${userEmail}`}
                className="text-purple-500 font-semibold open-sans italic hover:underline"
              >
                {userEmail}
              </a>
              <Image src={copyIcon} alt="Copy Icon" className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
      )}

      {/* Phone Number */}
      {phoneNumber && (
        <div className="flex items-center gap-4">
          <Image src={emailIcon} alt="Phone icon" width={20} height={20} />
          <div>
            <p className="text-base flex items-center gap-2">Phone Number</p>
            <div className="flex items-center">
              <a
                href={`tel:${phoneNumber}`}
                className="text-purple-500 font-semibold open-sans italic hover:underline"
              >
                {phoneNumber}
              </a>
              <Image src={copyIcon} alt="Copy Icon" className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
