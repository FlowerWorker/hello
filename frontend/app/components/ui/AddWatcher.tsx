"use client";

import React, { useState } from "react";
import Image from "next/image";
import SelectedWatcher from "./SelectedWatcher";
import InviteNewTeamMembers from "./InviteNewTeamMembers";

// Icon imports
import xIcon from "@/app/public/x-icon.svg";
import searchIcon from "@/app/public/searchIcon.svg";
import userIcon2 from "@/app/public/user-icons/userIcon2.svg";
import userIcon3 from "@/app/public/user-icons/userIcon3.svg";
import inviteUserIcon from "@/app/public/inviteUserIcon.svg";
import watcherIcon from "@/app/public/assignees.svg";

// Recently used watchers (mock data)
const recentlyUsed = [
    {
        id: 1,
        name: "Maria Pepita Flores",
        icon: userIcon3,
        email: "maria@domain.com",
        role: "Frontend Developer",
    },
    {
        id: 2,
        name: "Berta Fernandez",
        icon: userIcon2,
        email: "berta@domain.com",
        role: "Backend Developer",
    },
    {
        id: 3,
        name: "Somebody",
        icon: null,
        email: "somebody@domain.com",
        role: "Designer",
    },
];

export default function AddWatcher({
    toggleWatcher,
}: {
    toggleWatcher: () => void;
}) {
    const [selectedWatcher, setSelectedWatcher] = useState<{
        id: number;
        name: string;
        icon: string | null;
        email: string;
        role: string;
    } | null>(null);

    const [isSelectedWatcherVisible, setIsSelectedWatcherVisible] =
        useState<boolean>(false);

    const [searchQuery, setSearchQuery] = useState<string>("");

    const [isInviteVisible, setIsInviteVisible] = useState<boolean>(false);

    const filteredWatcher = recentlyUsed.filter((watcher) =>
        watcher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className="flex flex-col bg-gray-50 min-w-[280px] max-w-[360px] sm:w-[360px] min-h-[526px]
     rounded-[23px] gap-3 shadow-left-heavy px-6 py-6 mb-3 relative "
        >
            <div className="flex justify-center items-center ">
                <h1 className="mx-auto text-2xl font-bold">Add watchers</h1>
                <Image
                    src={xIcon}
                    alt="x icon"
                    className="cursor-pointer"
                    onClick={toggleWatcher}
                />
            </div>

            {/* Search bar */}
            <div className="flex justify-center mt-5 relative">
                <input
                    placeholder="Search for watcher..."
                    className="border-2 rounded-lg border-black pl-10 h-[40px] w-full sm:w-[328px]"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Image
                    src={searchIcon}
                    alt="search icon"
                    className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2"
                />
            </div>

            {/* Task watcher */}
            <div className="mt-4">
                <p className="font-bold text-xl">Task watchers:</p>
                {/* Leave this empty as no watcher are added here */}
            </div>

            <p className="font-semibold text-[#C5C1BB]">Recently used</p>

            <hr />

            {/* Recently used watcher */}
            <div className="flex flex-col gap-1 relative">
                {filteredWatcher.length > 0 ? (
                    filteredWatcher.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between border p-1 px-2 rounded-full cursor-pointer hover:bg-[#E2E2E2] hover:border-[#B055CC]"
                        >
                            <div className="flex items-center">
                                {user.icon ? (
                                    <Image src={user.icon} alt="user icon" />
                                ) : (
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DEDBD8] flex items-center justify-center">
                                        <span className="text-[#181615] font-bold text-sm">SM</span>
                                    </div>
                                )}
                                <p className="text-lg font-semibold pl-3 text-[#181615]">
                                    {user.name}
                                </p>
                            </div>

                            <Image
                                src={watcherIcon}
                                alt="watcher icon"
                                className="mr-2"
                                onClick={() => {
                                    setSelectedWatcher(user);
                                    setIsSelectedWatcherVisible(true);
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No watcher found</p>
                )}

                {selectedWatcher && isSelectedWatcherVisible && (
                    <div className="absolute sm:left-full -left-10 -top-14 ml-4">
                        <SelectedWatcher
                            watcher={selectedWatcher}
                            onClose={() => setIsSelectedWatcherVisible(false)}
                        />
                    </div>
                )}

                {/* Conditionally render InviteNewTeamMembers */}
                {isInviteVisible && (
                    <div className="absolute border-2 shadow-2xl rounded-[24px] -left-10 sm:-left-24 -top-28 md:-left-60 sm:-top-14 ml-4">
                        <InviteNewTeamMembers
                            handleCloseInvite={() => setIsInviteVisible(false)}
                        />
                    </div>
                )}
            </div>

            {/* Save button */}
            <div className="flex justify-end">
                <button className="bg-[#B7B1AA] text-black rounded-xl py-1 px-4 h-[37px] w-[77px]">
                    Save
                </button>
            </div>

            {/* Invite button */}
            <button
                className="flex items-center border border-black rounded-lg py-1 px-4 mt-1 gap-3 hover:bg-[#E2E2E2]"
                onClick={() => setIsInviteVisible(!isInviteVisible)} // Toggle visibility
            >
                <Image src={inviteUserIcon} alt="invite user icon" />
                <p className="text-lg font-regular">Invite new team members</p>
            </button>
        </div>
    );
}