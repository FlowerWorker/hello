"use client";

import React, { useState } from "react";
import Image from "next/image";
import DropTaskContainer from "../drag-drop/DropTaskContainer";
import AddTaskCard from "./AddTaskCard";
import ListActionsCard from "./ListActionsCard";

// Icon imports
import collapseIcon from "@/app/public/collapseIcon.svg";
import dotsIcon from "@/app/public/dotsIcon.svg";
import plusIcon from "@/app/public/plus-icon.svg";
import plusIconDark from "@/app/public/plusIconDark.svg";
import aiIcon from "@/app/public/ai-icon.svg";
import optionsIcon from "@/app/public/optionsIcon.svg";

// Typescript props imports
import { TaskList } from "../drag-drop/DropTaskContainer";
import { Assignee } from "../drag-drop/DropTaskContainer";

// Interface defining the properties for the TaskContainer component
interface TaskContainerProps {
    title: string; // Title of the task container
    tasks: Array<{
        id: string; // Unique identifier for the task
        labelNames: string[]; // Labels associated with the task
        name: string; // Name of the task
        assignees: Assignee[]; // List of assignees assigned to the task
        deadline: string; // Deadline associated with the task
        subtask: number; // Number of subtask items
        position: number; // Position of the task in the list
        listName: string;
    }>;
    moveTask: (
        id: string,
        currentContainer: keyof TaskList,
        newContainer: keyof TaskList
    ) => void; // Function to move a task between containers
    containerName: keyof TaskList; // Name of the container
    onAddTask?: () => void; // Optional function to handle adding a new task
    buttonText?: string; // Optional text for the button
    buttonIcon?: string | React.ReactNode; // Optional icon for the button
    onDotsClick?: () => void; // Optional function for dots button click
    isCollapsed?: boolean; // New prop to determine if the container is collapsed
    onToggleCollapse?: () => void; // New prop for toggling collapse state
    showAddTask: string | null;
}

// Functional component for rendering a task container
const TaskContainer: React.FC<TaskContainerProps> = ({
    title,
    tasks,
    moveTask,
    containerName,
    onAddTask,
    buttonText,
    buttonIcon,
    onDotsClick,
    isCollapsed,
    onToggleCollapse,
    showAddTask,
}) => {
    return (
        <div
            className={`bg-[#E9E7E5] rounded-[20px] px-2 py-4 text-xl font-bold shadow-left-heavy transition-all duration-300 ease-in-out ${isCollapsed
                    ? "inline-flex w-10 min-h-[220px] h-[fit-content] items-center justify-center hover:bg-[#d4d2d1]"
                    : "min-w-[275px] sm:w-[342px]"
                }`}
        >
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={isCollapsed ? onToggleCollapse : undefined}
            >
                <p
                    className={`text-black ${isCollapsed
                            ? "transform rotate-90 min-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis"
                            : "whitespace-normal"
                        }`}
                    style={{ maxWidth: isCollapsed ? "140px" : "none" }}
                >
                    {isCollapsed && title.length > 16
                        ? `${title.slice(0, 16)}...`
                        : title}
                </p>

                {/* Icons and content that should stay fixed in position */}
                {!isCollapsed && (
                    <div className="flex gap-3 flex-shrink-0">
                        {/* Collapse list button and tooltip */}
                        <div className="relative group">
                            <button
                                className="hover:bg-[#cccccc] hover:rounded-md p-1"
                                onClick={onToggleCollapse}
                            >
                                <Image
                                    src={collapseIcon}
                                    alt="collapse icon"
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </button>
                            <div
                                className="absolute invisible group-hover:visible bg-[#707070]
               text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap left-1/2 -translate-x-1/2 mt-1"
                            >
                                Collapse list
                            </div>
                        </div>

                        {/* List actions button and tooltip */}
                        <div className="relative group">
                            <button
                                className="hover:bg-[#cccccc] hover:rounded-md px-1 py-4"
                                onClick={onDotsClick}
                            >
                                <Image
                                    src={dotsIcon}
                                    alt="dots icon"
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </button>

                            <div
                                className="absolute invisible group-hover:visible bg-[#707070]
               text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap left-1/4 sm:left-1/2  -translate-x-1/2 mt-1"
                            >
                                List actions
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Render task container content only if not collapsed */}
            <div className={`${isCollapsed ? "hidden" : "block"}`}>
                <div className="pt-4 pb-2">
                    <hr className="bg-gray-300 h-[2px]" />
                </div>

                <div className="h-auto">
                    <DropTaskContainer
                        tasks={tasks}
                        moveTask={moveTask}
                        containerName={containerName}
                    />

                    {showAddTask === containerName && (
                        <AddTaskCard listName={showAddTask} />
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className="flex items-center justify-center rounded-[40px] text-black text-base sm:text-lg font-semibold bg-[#B7B1AA] hover:bg-[#9e9b98] w-44 h-[40px] md:w-[14em] py-4"
                        onClick={onAddTask}
                    >
                        <Image
                            src={plusIconDark || plusIcon}
                            alt="plus icon"
                            className="cursor-pointer mr-2 h-auto w-auto"
                            width={20}
                            height={20}
                        />
                        {buttonText}
                    </button>

                    <div className="flex">
                        <div className="relative group h-auto w-auto">
                            <Image
                                src={aiIcon}
                                alt="ai icon"
                                className="cursor-pointer"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <div
                                className="absolute invisible group-hover:visible z-50 w-[14em] bg-[#707070]
               text-white text-sm text-center px-2 py-1 rounded-lg left-1/5 sm:left-1/2 -translate-x-1/2 mt-1"
                            >
                                Let Ai create a detailed task breakdown structure for your
                                project!
                            </div>
                        </div>
                        <Image
                            src={optionsIcon}
                            alt="options icon"
                            className="cursor-pointer h-auto w-auto"
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskContainer;