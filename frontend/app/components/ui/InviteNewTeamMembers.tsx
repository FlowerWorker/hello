"use client";

import React, { useState } from "react";
import Image from "next/image";
import copyLinkIcon from "@/app/public/copyLink.svg";
import xIcon from "@/app/public/x-icon.svg";

interface InviteNewTeamMembersProps {
    handleCloseInvite: () => void;
}

export default function InviteNewTeamMembers({
    handleCloseInvite,
}: InviteNewTeamMembersProps) {
    const [emailOrName, setEmailOrName] = useState("");
    const [permission, setPermission] = useState("Can edit");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    const handleSendInvite = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            `Invite sent to: ${emailOrName} with permission: ${permission}`
        );
        setEmailOrName(""); // Clear the input field
    };

    const handleCopyLink = () => {
        // Assuming the base URL is "/invite" and including the email and permission in the link
        const inviteLink = `${window.location.origin
            }/invite?email=${encodeURIComponent(
                emailOrName
            )}&permission=${encodeURIComponent(permission)}`;

        navigator.clipboard
            .writeText(inviteLink)
            .then(() => {
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000); // Reset "link copied" state after 2 seconds
            })
            .catch((error) => console.error("Error copying link: ", error));
    };

    return (
        <div className="bg-white min-h-[201px] md:w-[768px]  p-5 rounded-[22px] shadow-lg z-50">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">Invite new team members</h1>

                <div className="flex gap-3 items-center">
                    <Image src={copyLinkIcon} alt="copy link icon" />

                    <button
                        className="text-[#181615] hover:text-gray-700 font-semibold sm:mr-2"
                        type="button"
                        onClick={handleCopyLink}
                    >
                        {linkCopied ? "Link copied!" : "Copy link"}
                    </button>

                    <button
                        onClick={handleCloseInvite}
                        className="text-gray-500 hover:text-gray-700"
                        type="button"
                    >
                        <Image
                            src={xIcon}
                            alt="x icon"
                            className="h-4 w-4 min-w-4 min-h-4"
                        />
                    </button>
                </div>
            </div>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm mb-4">
                New members will gain access to your workspace. Decide whether they can
                edit or just view.
            </p>

            <hr className="mb-6 -mt-3 border-[1px]" />

            {/* Form */}
            <form
                onSubmit={handleSendInvite}
                className="flex items-center gap-2 flex-col sm:flex-row"
            >
                <input
                    type="text"
                    placeholder="Invite members by name or mail..."
                    value={emailOrName}
                    onChange={(e) => setEmailOrName(e.target.value)}
                    className="flex-grow border-black border-[2px] rounded-lg px-3 py-2 text-sm"
                    required
                />

                {/* Custom Dropdown */}
                <div className="relative w-36">
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full rounded-lg px-2 py-2 text-sm border-black border-[2px] flex justify-between items-center"
                    >
                        {permission}
                        <span className="ml-2">&#9662;</span>
                    </button>

                    {isDropdownOpen && (
                        <ul className="absolute top-full left-0 w-full bg-purple-300 border-black border-[2px] rounded-b-lg mt-1 z-10">
                            <li
                                className="px-2 py-1 hover:bg-purple-400 cursor-pointer"
                                onClick={() => {
                                    setPermission("Can edit");
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Can edit
                            </li>
                            <li
                                className="px-2 py-1 hover:bg-purple-400 cursor-pointer"
                                onClick={() => {
                                    setPermission("Can view");
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Can view
                            </li>
                        </ul>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-[#BD71D4] text-white rounded-lg px-4 py-2 hover:bg-[#a864bd]"
                >
                    Send invite
                </button>
            </form>
        </div>
    );
}
