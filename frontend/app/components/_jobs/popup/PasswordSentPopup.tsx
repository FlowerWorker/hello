import React from "react";
import Image from "next/image";
import popUpLogo from "@/app/public/_Logo.png";

interface PasswordSentPopupProps {
  email: string;
}

export default function PasswordSentPopup({ email }: PasswordSentPopupProps) {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform  -translate-x-1/2  -translate-y-1/2
      bg-gradient-to-b from-[#9C2BBF] to-[#5c1a70] text-white rounded-lg shadow-lg p-6 w-full max-w-[400px]  sm:max-w-[623px] min-h-[276px] z-20"
    >
      <div>
        {/* Title */}
        <div>
          <h2 className="text-[26px] font-bold">Password sent</h2>
        </div>

        {/* Message */}
        <p className="text-[22px] font-light mt-3 max-w-[540px] leading-9 break-words">
          We`ve sent a password reset email to ({email}). If that`s your
          Gaddr.com account, follow the instructions to create a new
          password.
        </p>

        {/* Logo */}
        <div className="flex justify-end -mt-10 ">
          <Image src={popUpLogo} alt="Logo" className="w-[60px] h-[70px]" />
        </div>
      </div>
    </div>
  );
}
