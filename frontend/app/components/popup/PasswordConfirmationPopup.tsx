import React from "react";
import Image from "next/image";
import popUpLogo from "@/app/public/_Logo.png";

export default function PasswordSentPopup() {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-gradient-to-b from-[#9C2BBF] to-[#5c1a70] text-white rounded-lg shadow-lg p-6
   w-full max-w-[400px] sm:max-w-[623px] sm:min-h-[240px]  z-20"
    >
      <div>
        {/* Title */}
        <div>
          <h2 className="text-[26px] font-bold">Password Updated</h2>
        </div>

        {/* Message */}
        <p className="text-[22px] font-light mt-3 max-w-[500px] leading-9 break-words">
          Your password has been updated successfully. You will be redirected to
          the login page shortly.
        </p>

        {/* Logo */}
        <div className="flex justify-end">
          <Image src={popUpLogo} alt="Logo" className="w-[60px] h-[70px]" />
        </div>
      </div>
    </div>
  );
}
