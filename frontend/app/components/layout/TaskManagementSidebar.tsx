"use client";

import React from "react";
import Image from "next/image";
import userIcon from "@/app/public/user-icon.png";
import leftArrow from "@/app/public/left-arrow.svg";
import rightArrow from "@/app/public/right-arrow.svg";
import home from "@/app/public/homeIcon.svg";
import agenda from "@/app/public/agendaIcon.svg";
import members from "@/app/public/membersIcon.svg";
import settings from "@/app/public/settingsIcon.svg";
import downArrow from "@/app/public/down-arrow.svg";
import arrowLeft from "@/app/public/arrowLeft.svg";

interface SidebarProps {
    isLeftDivRetracted: boolean; // State to determine if the sidebar is retracted
    toggleLeftDiv: () => void; // Function to toggle the sidebar
}

const TaskManagementSidebar: React.FC<SidebarProps> = ({
    isLeftDivRetracted,
    toggleLeftDiv,
}) => {
    return (
        <div
            className={`bg-gradient-to-b from-[#282625] to-[#6E1F87] h-[550px] rounded-b-[20px] transition-all duration-1300 pt-2 px-4 ${isLeftDivRetracted
                    ? "min-w-0 w-1/20"
                    : "min-w-full md:min-w-[250px] max-w-[260px] w-1/6"
                } absolute sm:relative`}
        >
            {isLeftDivRetracted && (
                <Image
                    src={rightArrow}
                    alt="right arrow icon"
                    className="cursor-pointer absolute -right-5 top-28 transform -translate-y-1/2  block"
                    onClick={toggleLeftDiv}
                    style={{ width: "auto", height: "auto" }}
                />
            )}

            <div
                className={`text-white flex flex-col justify-between h-[650px] ${isLeftDivRetracted ? "hidden" : "flex"
                    }`}
            >
                {/* Top sidebar container */}
                <div>
                    
                    <h1 className="font-bold text-base py-2 ml-2">Workspaces</h1>
                    
                    <div className="flex items-center pt-8 pb-10 px-1">
                        <Image
                            src={userIcon}
                            alt="user icon"
                            className="w-10 h-10 rounded-md"
                            style={{ width: "auto", height: "auto"}}
                        />

                        <h1 className="font-bold text-xl ml-2">Workspace name</h1>

                        <Image
                            src={arrowLeft}
                            alt="left arrow icon"
                            className="cursor-pointer absolute right-0 sm:-right-3 top-28 transform -translate-y-1/2  block"
                            onClick={toggleLeftDiv}
                            style={{ width: "auto", height: "auto" }}
                        />
                    </div>

                    {/* Mid sidebar container */}

                    <div className="font-medium">
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={home}
                                alt="home icon"
                                className="w-5 h-5 md:w-6 md:h-6"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Home</p>
                        </div>
                        <hr />
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={agenda}
                                alt="agenda icon"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Agenda</p>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between py-2 px-2">
                            <div className="flex items-center">
                                <Image
                                    src={members}
                                    alt="members icon"
                                    style={{ width: "auto", height: "auto" }}
                                />
                                <span className="flex ml-3">
                                    <p className="text-xl">Members </p>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={settings}
                                alt="settings icon"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Settings</p>
                        </div>
                    </div>

                    {/* Bottom sidebar container */}
                    <div className="mt-4">
                        <div className="flex justify-between pb-1  px-2">
                            <p className=" text-xl font-semibold">Projects </p>

                            <div>
                                <Image src={downArrow} alt="down arrow icon" />
                            </div>
                        </div>

                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagementSidebar;
