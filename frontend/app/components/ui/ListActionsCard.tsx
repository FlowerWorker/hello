"use client";

import React, { useState } from "react";
import Image from "next/image";

// Icon imports
import xIcon from "@/app/public/x-icon.svg";
import downArrowDark from "@/app/public/downArrowDark.svg";
import copyIcon from "@/app/public/copyIcon.svg";
import moveIcon from "@/app/public/moveIcon.svg";
import watchDarkIcon from "@/app/public/watchDarkIcon.svg";
import upArrowIcon from "@/app/public/upArrowDark.svg";

interface ListActionsCardProps {
    onClose: () => void;
}

export default function ListActionsCard({ onClose }: ListActionsCardProps) {
    const [isAddATaskVisible, setIsAddATaskVisible] = useState(false);
    const [isMoveListVisible, setIsMoveListVisible] = useState(false);

    const handleToggleClick = (
        setState: React.Dispatch<React.SetStateAction<boolean>>,
        state: boolean
    ) => {
        setState(!state);
    };

    return (
        <div
            className="flex flex-col bg-gray-50 w-[290px] max-w-[294px]  min-h-[266px]
 rounded-[20px] gap-3 shadow-left-heavy px-6 py-6 mb-3 "
        >
            <div className="flex justify-center items-center ">
                <h1 className="mx-auto text-lg font-bold">List Actions</h1>
                <Image
                    onClick={onClose}
                    src={xIcon}
                    alt="x icon"
                    className="cursor-pointer"
                />
            </div>

            {/* List actions buttons */}
            <div className="flex flex-col gap-1 text-[#181615] text-md font-semibold -ml-4">
                <button
                    onClick={() =>
                        handleToggleClick(setIsAddATaskVisible, isAddATaskVisible)
                    }
                    className="flex items-center hover:bg-[#E9E7E5] hover:rounded-lg max-w-[260px] ml-1 px-4 py-1"
                >
                    <Image
                        className="ml-1"
                        src={isAddATaskVisible ? upArrowIcon : downArrowDark}
                        alt={
                            isAddATaskVisible ? "up arrow dark icon" : "down arrow dark icon"
                        }
                    />
                    <span className="ml-[13px]"> Add a task</span>
                </button>

                {isAddATaskVisible && (
                    <div className="font-normal ml-16">
                        <ul className="list-disc text-lg">
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create on my own
                            </li>
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create with AI
                            </li>
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create from template
                            </li>
                        </ul>
                    </div>
                )}

                <button className="flex items-center hover:bg-[#E9E7E5] hover:rounded-lg   max-w-[260px] px-4 py-1">
                    <Image src={copyIcon} alt="copy icon" />
                    <span className="ml-2">Copy list</span>
                </button>

                <button
                    onClick={() =>
                        handleToggleClick(setIsMoveListVisible, isMoveListVisible)
                    }
                    className="flex items-center hover:bg-[#E9E7E5] hover:rounded-lg  max-w-[260px] ml-1 px-4 py-1"
                >
                    <Image src={moveIcon} alt="move icon" />
                    <span className="ml-2">Move list to...</span>
                </button>

                {isMoveListVisible && (
                    <div className="font-normal ml-14">
                        <ul className="list-disc text-lg">
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create on my own
                            </li>
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create with AI
                            </li>
                            <li className="hover:bg-[#E9E7E5] hover:rounded-lg cursor-pointer hover:pl-1">
                                Create from template
                            </li>
                        </ul>
                    </div>
                )}

                <button className="flex items-center hover:bg-[#E9E7E5] hover:rounded-lg  max-w-[260px] px-4 py-1">
                    <Image src={watchDarkIcon} alt="watch dark icon" />
                    <span className="ml-2">Watch task</span>
                </button>
            </div>

            <hr className="border" />

            <button className="font-semibold hover:bg-[#E9E7E5] hover:rounded-lg flex ml-7">
                Archieve this list
            </button>
        </div>
    );
}
