/**
 * TaskCard Component
 *
 * A component that displays a task card with labels, task name, assignees, deadline, and subtask.
 *
 * Props:
 * - labelNames: Array of labels associated with the task.
 * - taskName: Name of the task.
 * - position: Count of attachments.
 * - assignees: Array of assignee objects with IDs.
 * - deadline: Date of the task.
 * - subtask: Count of subtask items.
 *
 * Usage:
 * <TaskCard
 *   labelNames={['Urgent', 'Important']}
 *   taskName="Finish Documentation"
 *   position={3}
 *   assignees={[{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]}
 *   deadline={new Date()}
 *   subtask={5}
 * />
 */

"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useDrag } from "react-dnd";
import { Assignee } from "../drag-drop/DropTaskContainer";

// Icon imports
import attachementsIcon from "@/app/public/attachementsIcon.svg";
import bellIcon from "@/app/public/bell-icon.svg";
import paperIcon from "@/app/public/paperIcon.svg";
import watchingIcon from "@/app/public/watchIcon.svg";
import assigneesIcon from "@/app/public/assigneesIcon.svg";
import deadlineIcon from "@/app/public/deadlineIcon.svg";

type TaskCardProps = {
  listName: string;
  labelNames: string[]; // Array of labels associated with the task
  taskName: string; // Name of the task
  position: number; // Count of attachments
  assignees: Assignee[]; // Array of assignees objects with IDs
  deadline: Date; // Date of the task
  subtask: number; // Count of subtask items
  id: string; // Unique identifier for the task
  currentContainer: string; // Current container of the task
};

const TaskCard: React.FC<TaskCardProps> = ({
  listName,
  labelNames,
  taskName,
  position,
  assignees,
  deadline,
  subtask,
  id,
  currentContainer,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id, currentContainer },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Assignees icons colors example
  const colors = [
    "bg-rose-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-teal-600",
    "bg-orange-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-gray-600",
  ];

  // Label colors example
  const labelColors = [
    "#C6EDFB", // Light Blue
    "#68BCD8", // Blue
    "#4DC693", // Green
    "#FFD700", // Gold
    "#FF6347", // Tomato
    "#6A5ACD", // Slate Blue
    "#FF69B4", // Hot Pink
    "#20B2AA", // Light Sea Green
    "#FF4500", // Orange Red
    "#9370DB", // Medium Purple
  ];

  // Create a ref with useRef
  const ref = useRef<HTMLDivElement>(null);
  drag(ref);

  return (
    <div
      ref={ref}
      className={`cursor-pointer flex flex-col bg-gray-50 sm:w-[330px] sm:h-[205px] z-0
         rounded-[20px] py-2 gap-3 shadow-left-heavy px-4 mb-3 hover:border-[#BD71D4] hover:border-2 ${
           isDragging ? "opacity-50" : ""
         }`}
    >
      {/* Label container */}
      <div className="flex gap-1">
        {labelNames.map((label, index) => (
          <div
            key={index}
            className={`w-[51px] h-[6px] rounded-[20px]`}
            style={{ backgroundColor: labelColors[index % labelColors.length] }} // Cycle through colors
          ></div>
        ))}
      </div>

      {/* Task name & icons container  */}
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">{taskName}</h1>
          <div>
            <Image src={bellIcon} alt="bell icon" />
          </div>
        </div>

        <div className="flex gap-1 items-center text-sm font-light mb-1">
          <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">!</span>
          </div>

          <span>in list</span>

          <span className="italic underline hover:font-bold hover:text-[#BD71D4]">
            {listName}
          </span>
        </div>

        <hr className="border-t-2" />

        <div className="flex gap-2 py-1 items-center">
          <div>
            <Image src={paperIcon} alt="paper icon" />
          </div>

          <div className="flex items-center">
            <div>
              <Image src={attachementsIcon} alt="attachments icon" />
            </div>
            <span className=" text-[#B7B1AA] text-base">{position}</span>
          </div>

          <div>
            <Image src={watchingIcon} alt="watch icon" />
          </div>
        </div>

        <hr className="border-t-2" />
      </div>

      {/* Assignees container  */}
      <div className="flex -mt-2 justify-between">
        <div className="flex">
          <h1 className="font-semibold text-base text-[#181615]">
            Assignees:{" "}
          </h1>

          <div className="flex items-center ml-2 relative space-x-[-8px]">
            {assignees.map((assignee, index) => (
              <div
                key={assignee.id}
                className={`w-5 h-5 rounded-full ${
                  colors[index % colors.length]
                } flex items-center justify-center p-3`}
              >
                <span className="text-white font-semibold text-[9px]">
                  {assignee.name
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </span>
              </div>
            ))}
            <div className="absolute -right-[2px] bottom-[2px] w-[6px] h-[6px] rounded-full bg-green-400 border border-black"></div>
          </div>
        </div>

        <div>
          <Image src={assigneesIcon} alt="assignees icon" />
        </div>
      </div>

      {/* Date container */}
      <div className="flex -mt-2 justify-between">
        <div className="flex">
          <h1 className="font-semibold text-base text-[#181615]">Deadline: </h1>
          <div className="flex ml-1 text-sm items-center">
            <p className="ml-1 text-[#181615]">
              {`${deadline.getDate()} ${deadline.toLocaleString("default", {
                month: "short",
              })} ${deadline
                .getFullYear()
                .toString()
                .slice(-2)} at ${deadline.getHours()}:${deadline
                .getMinutes()
                .toString()
                .padStart(2, "0")}`}
            </p>
          </div>
        </div>

        <div>
          <Image className="mr-1" src={deadlineIcon} alt="deadline icon" />
        </div>
      </div>

      {/* Subtask container  */}
      <div className="flex items-center gap-1 -mt-2">
        <h1 className="font-semibold text-base  text-[#181615]">Subtasks:</h1>
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`h-[10px] w-[8px] sm:h-3 sm:w-4 ${
                index < Number(subtask) ? "bg-[#827E79]" : "bg-[#CFCBC6]"
              } ${
                index === 0
                  ? "rounded-l-full"
                  : index === 9
                  ? "rounded-r-full"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;