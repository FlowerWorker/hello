"use client";

import React, { useState } from "react";
import Image from "next/image";
import closeIcon from "@/app/public/x-icon.svg";
import editIcon from "@/app/public/editIcon.svg";
import copyIcon from "@/app/public/copyIconWhite.svg";

export default function SelectedAssignees({
    assignee,
    onClose,
}: {
    assignee: {
        id: number;
        name: string;
        icon: string | null;
        email: string;
        role: string;
    };
    onClose: () => void;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(assignee.email).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="flex flex-col bg-[#FFFFFF] w-[280px] min-h-[237px] sm:w-[371px] rounded-[20px] py-5 gap-3 px-4 mb-3 border border-black relative">
            {/* Top part  */}
            <div className="flex items-center justify-between bg-[#DEDBD8] rounded-t-[20px] -mx-4 -mt-5 px-4 pb-14">
                <div className="w-[90px] h-[90px] sm:w-28 sm:h-28 rounded-full flex items-center justify-center absolute top-[35px] sm:top-[20px] sm:left-3">
                    {assignee.icon ? (
                        <Image
                            src={assignee.icon}
                            alt="user icon"
                            className="w-[100px] h-[100px]"
                        />
                    ) : (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DEDBD8] flex items-center justify-center">
                            <span className="text-[#181615] font-bold text-sm">SM</span>
                        </div>
                    )}
                </div>

                <div className="ml-28 sm:ml-[120px] mt-[40px] -mb-8 flex-grow pr-8 min-h-[70px]">
                    <p className="text-lg sm:text-xl font-bold break-words">
                        {assignee.name}
                    </p>
                    <p className="text-[#171929] mt-3 font-semibold break-words">
                        {assignee.role}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="flex-shrink-0 cursor-pointer mb-16 sm:mb-0 sm:-mt-9 sm:mr-2
           hover:bg-[#c5c3c0] hover:p-1 rounded-sm absolute top-14 right-4"
                >
                    <Image src={closeIcon} alt="Close" />
                </button>
            </div>

            {/* Bottom part  */}
            <div className="flex flex-col justify-start ">
                <p>E-mail</p>

                <div className="flex items-center gap-2 mb-2">
                    <p className="italic text-[#B055CC] font-semibold pr-3">
                        {assignee.email}
                    </p>

                    <Image
                        src={copyIcon}
                        alt="copy icon"
                        className="cursor-pointer"
                        onClick={handleCopy}
                    />
                    {copied && (
                        <span className="text-sm text-[#B055CC] italic">Copied!</span>
                    )}
                </div>

                <div>
                    <p>Local time</p>
                    <span className="font-bold">12:00</span>
                </div>

                <hr />

                {/* Bottome icons  */}
                <div className=" flex gap-3 mt-4 hover:bg-[#E2E2E2] p-1 rounded-md">
                    <div>
                        <Image src={editIcon} alt="edit icon" />
                    </div>

                    <button className="font-bold flex items-start text-left">
                        Edit profile info
                    </button>
                </div>
            </div>
        </div>
    );
}
