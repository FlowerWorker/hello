"use client";

import React from "react";
import Image from "next/image";
import DropTaskContainer, { TaskList, Assignee } from "../drag-drop/DropTaskContainer";
import AddTaskCard from "./AddTaskCard";

// Icons
import collapseIcon from "@/app/public/collapseIcon.svg";
import dotsIcon from "@/app/public/dotsIcon.svg";
import plusIcon from "@/app/public/plus-icon.svg";
import plusIconDark from "@/app/public/plusIconDark.svg";
import aiIcon from "@/app/public/ai-icon.svg";
import optionsIcon from "@/app/public/optionsIcon.svg";
import trashIcon from "@/app/public/closeIcon.png";

interface TaskContainerProps {
  title: string;
  tasks: Array<{
    id: string;
    labelNames: string[];
    name: string;
    assignees: Assignee[];
    deadline: string;
    subtask: number;
    position: number;
    listName: string;
  }>;
  moveTask: (
    id: string,
    currentContainer: keyof TaskList,
    newContainer: keyof TaskList
  ) => void;
  containerName: keyof TaskList;
  onAddTask?: () => void;
  buttonText?: string;
  buttonIcon?: string | React.ReactNode;
  onDotsClick?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  showAddTask: string | null;
  handleDeleteTask: (taskId: string, containerName: keyof TaskList) => void;
}

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
  handleDeleteTask,
}) => {
  return (
    <div
      className={`bg-[#E9E7E5] rounded-[20px] px-2 py-4 text-xl font-bold shadow-left-heavy transition-all duration-300 ease-in-out ${
        isCollapsed
          ? "inline-flex w-10 min-h-[220px] h-[fit-content] items-center justify-center hover:bg-[#d4d2d1]"
          : "min-w-[275px] sm:w-[342px]"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={isCollapsed ? onToggleCollapse : undefined}
      >
        <p
          className={`text-black ${
            isCollapsed
              ? "transform rotate-90 min-w-[170px] whitespace-nowrap overflow-hidden text-ellipsis"
              : "whitespace-normal"
          }`}
          style={{ maxWidth: isCollapsed ? "140px" : "none" }}
        >
          {isCollapsed && title.length > 16
            ? `${title.slice(0, 16)}...`
            : title}
        </p>

        {!isCollapsed && (
          <div className="flex gap-3 flex-shrink-0">
            <div className="relative group">
              <button
                className="hover:bg-[#cccccc] hover:rounded-md p-1"
                onClick={onToggleCollapse}
              >
                <Image src={collapseIcon} alt="collapse icon" />
              </button>
              <div className="absolute invisible group-hover:visible bg-[#707070] text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap left-1/2 -translate-x-1/2 mt-1">
                Collapse list
              </div>
            </div>

            <div className="relative group">
              <button
                className="hover:bg-[#cccccc] hover:rounded-md px-1 py-4"
                onClick={onDotsClick}
              >
                <Image src={dotsIcon} alt="dots icon" />
              </button>
              <div className="absolute invisible group-hover:visible bg-[#707070] text-white text-sm px-2 py-1 rounded-lg whitespace-nowrap left-1/4 sm:left-1/2 -translate-x-1/2 mt-1">
                List actions
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`${isCollapsed ? "hidden" : "block"}`}>
        <div className="pt-4 pb-2">
          <hr className="bg-gray-300 h-[2px]" />
        </div>

        <div className="h-auto space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="relative bg-white rounded-xl p-4 shadow-md space-y-2"
            >
              {/* Existing task content */}
              <DropTaskContainer
                tasks={[task]}
                moveTask={moveTask}
                containerName={containerName}
              />

              {/* Delete button at bottom */}
              <div className="flex justify-end pt-2">
                <button
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteTask(task.id, containerName)}
                >
                  <Image src={trashIcon} alt="Delete" width={16} height={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {showAddTask === containerName && <AddTaskCard listName={showAddTask} />}
        </div>

        <div className="flex items-center justify-between mt-4">
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

          <div className="flex gap-4">
            <div className="relative group h-auto w-auto">
              <Image
                src={aiIcon}
                alt="ai icon"
                className="cursor-pointer"
              />
              <div className="absolute invisible group-hover:visible z-50 w-[14em] bg-[#707070] text-white text-sm text-center px-2 py-1 rounded-lg left-1/5 sm:left-1/2 -translate-x-1/2 mt-1">
                Let Ai create a detailed task breakdown structure for your
                project!
              </div>
            </div>
            <Image
              src={optionsIcon}
              alt="options icon"
              className="cursor-pointer"
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
