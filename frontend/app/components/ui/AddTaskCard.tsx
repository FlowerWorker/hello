"use client";

import React, { useState } from "react";
import Image from "next/image";
import AddAssignees from "./AddAssignees";
import AddDescription from "./AddDescription";
import AddWatcher from "./AddWatcher";

// Icon imports
import assigneesIcon from "@/app/public/assigneesIcon.svg";
import deadlineIcon from "@/app/public/deadlineIcon.svg";
import priorityIcon from "@/app/public/priorityIcon.svg";
import bellIcon from "@/app/public/bell-icon.svg";
import editIcon from "@/app/public/editIcon.svg";
import attachFileIcon from "@/app/public/attachementsIcon.svg";
import descriptionIcon from "@/app/public/paperIcon.svg";
import watchersIcon from "@/app/public/watchIcon.svg";
import labelIcon from "@/app/public/labelIcon.svg";
import subtasksIcon from "@/app/public/subtasksIcon.svg";
import arrowUpIcon from "@/app/public/arrowUpIcon.svg";
import arrowDownIcon from "@/app/public/arrowDownIcon.svg";
import greyDotsIcon from "@/app/public/dotsGreyIcon.svg";
import greyBellIcon from "@/app/public/grayBellIcon.svg";
import squareIcon from "@/app/public/squareIcon.svg";

// Define props interface
interface AddTaskCardProps {
    listName: string;
}

export default function AddTaskCard({ listName }: AddTaskCardProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("My first task");
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    const [showAssignees, setShowAssignees] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [showWatcher, setShowWatcher] = useState<boolean>(false);
    // Handle title change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    // Handle title click to enter edit mode
    const handleTitleClick = () => {
        setIsEditing(true);
    };

    // Handle input blur to exit edit mode
    const handleBlur = () => {
        setIsEditing(false);
    };

    // Toggle collapse
    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };

    // Toggle AddAssignees visibility
    const toggleAssignees = () => {
        setShowAssignees((prev) => !prev);
    };
    const toggleWatcher =() =>{
        setShowWatcher((prev) => !prev);
    };
    // Toggle desciption visibility
    const toggleDescription = () => {
        setShowDescription((prev) => !prev);
    };

    return (
        <div
            className={`cursor-pointer flex flex-col bg-gray-50 sm:w-[330px] 
     rounded-[20px] py-2 gap-3 shadow-left-heavy px-4 mb-3`}
        >
            {/* Label container */}
            <div className="flex justify-end gap-3">
                <Image
                    src={squareIcon}
                    alt="expand icon"
                    width={20}
                    height={20}
                    className="w-auto h-auto hover:bg-[#dddcdb]"
                />

                <Image
                    src={greyDotsIcon}
                    alt="dots icon"
                    width={20}
                    height={20}
                    className="w-auto h-auto hover:bg-[#dddcdb]"
                />
            </div>

            {/* Task name & icons container */}
            <div>
                <div className="flex justify-between items-center">
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            className="font-bold text-xl max-w-[200px] border-b"
                        />
                    ) : (
                        <h1
                            className="font-bold text-xl max-w-[200px] cursor-pointer relative hover:text-gray-400"
                            onClick={handleTitleClick}
                        >
                            {title}
                            <span className="absolute left-full ml-2 opacity-0 hover:opacity-100 transition-opacity">
                                <Image src={editIcon} alt="edit icon" width={20} height={20} />
                            </span>
                        </h1>
                    )}
                    <Image
                        src={greyBellIcon}
                        alt="bell icon"
                        width={20}
                        height={20}
                        className="w-auto h-auto"
                    />
                </div>

                <div className="flex gap-1 items-center text-sm font-light mb-1">
                    <span>in list</span>
                    <span className="italic underline hover:font-bold hover:text-[#BD71D4]">
                        {listName}
                    </span>
                </div>

                <hr className="border-t-2 mt-2" />
            </div>

            {/* Add task buttons */}
            <div className="flex flex-col text-[#827E79] text-sm font-semibold gap-1 transition-all duration-300">
                <button
                    onClick={toggleAssignees}
                    className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]"
                >
                    <Image
                        src={assigneesIcon}
                        alt="assignees icon"
                        width={20}
                        height={20}
                        className="w-auto h-auto"
                    />
                    <span className="ml-[8px]">Add assignees</span>
                </button>

                <button className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                    <Image
                        src={deadlineIcon}
                        alt="deadline icon"
                        width={20}
                        height={20}
                        className="w-auto h-auto"
                    />
                    <span className="ml-[8px]">Add a deadline</span>
                </button>

                {/* Collapsible buttons */}
                {!isCollapsed && (
                    <>
                        <button className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                            <Image
                                src={priorityIcon}
                                alt="priority icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Select a priority</span>
                        </button>

                        <button
                            onClick={toggleDescription}
                            className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]"
                        >
                            <Image
                                src={descriptionIcon}
                                alt="attach file icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Add a description</span>
                        </button>

                        <button className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                            <Image
                                src={attachFileIcon}
                                alt="description icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Attach a file</span>
                        </button>

                        <button 
                        onClick={toggleWatcher}
                        className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                            <Image
                                src={watchersIcon}
                                alt="watchers icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Add watchers</span>
                        </button>

                        <button 
                        
                        className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                       
                            <Image
                                src={labelIcon}
                                alt="label icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Add labels</span>
                        </button>

                        <button className="flex items-center hover:bg-[#dddcdb] hover:rounded-lg py-1 px-2 max-w-[200px]">
                            <Image
                                src={subtasksIcon}
                                alt="subtasks icon"
                                width={20}
                                height={20}
                                className="w-auto h-auto"
                            />
                            <span className="ml-2">Add subtasks</span>
                        </button>

                        <button className="text-black font-normal text-[20px] bg-[#3FDCD0] rounded-[7px] min-h-[35px]">
                            Outsource talent
                        </button>
                    </>
                )}

                {/* Collapse/Expand button */}
                <div className="flex items-center justify-center mt-2">
                    <button
                        onClick={toggleCollapse}
                        className="flex items-center justify-center text-sm text-gray-600"
                    >
                        <Image
                            src={isCollapsed ? arrowDownIcon : arrowUpIcon}
                            alt="collapse icon"
                            width={20}
                            height={20}
                            className="mr-1 w-auto h-auto"
                        />
                        {isCollapsed ? "Show more" : "Show less"}
                    </button>
                </div>
            </div>

            <div className="relative">
                {/* Show AddAssignees component when toggled */}
                {showAssignees && (
                    <div className="absolute -bottom-[100px] left-0 z-10">
                        <AddAssignees toggleAssignees={toggleAssignees} />
                    </div>
                )}
            </div>

            <div className="relative">
                {/* Show AddAssignees component when toggled */}
                {showDescription && (
                    <div className="absolute bottom-[100px] -right-[500px] z-30  w-[1120px]">
                        <AddDescription toggleDescription={toggleDescription} />
                    </div>
                )}
            </div>

            <div className="relative">
                {/* Show AddWatcher component when toggled */}
                {showWatcher && (
                    <div className="absolute -bottom-[100px] left-0 z-10">
                        <AddWatcher toggleWatcher={toggleWatcher} />
                    </div>
                )}
            </div>
        </div>
    );
}
