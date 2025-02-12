/**
 * TaskManagementDashboard Component
 *
 * This component serves as the main dashboard for managing tasks within the application.
 * It provides a drag-and-drop interface for organizing tasks into different categories:
 * - To Do
 * - In Progress
 * - Completed
 *
 * The component utilizes the react-dnd library for drag-and-drop functionality and
 * displays task cards for each task in the respective categories.
 *
 * It also includes a responsive sidebar for navigation and workspace management.
 *
 * @component
 */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import mockTasks from "../sampleData/mockTasks";

// Components imports
import { TaskList } from "../components/drag-drop/DropTaskContainer";
import TaskContainer from "../components/ui/TaskContainer";
import Navbar from "../components/layout/navbar";
import TaskManagementSidebar from "../components/layout/TaskManagementSidebar";
import ListActionsCard from "../components/ui/ListActionsCard";
import AddAssignees from "../components/ui/AddAssignees";
import AddDescription from "../components/ui/AddDescription";
import AddSubtasks from "../components/ui/AddSubtasks";

// Icon imports
import lock from "../public/lock-icon.svg";
import projects from "../public/projects-icon.svg";
import plus from "../public/plus-icon.svg";
import bellIcon from "../public/bell-icon.svg";
import listIcon from "../public/listIcon.svg";
import boardIcon from "../public/boardIcon.svg";
import calendarIcon from "../public/calendarIcon.svg";
import moreViewsIcon from "../public/moreViewsIcon.svg";
import grayBellIcon from "../public/grayBellIcon.svg";

const containerNames = ["todo", "inProgress", "completed"];

export default function TaskManagementDashboard() {
  // State declarations
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLeftDivRetracted, setIsLeftDivRetracted] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TaskList>(mockTasks);
  const [projectProgressBar, setProjectProgressBar] = useState<number>(5);
  const [showAddTask, setShowAddTask] = useState<string | null>(null);
  const [isListActionsCardVisible, setIsListActionsCardVisible] =
    useState<boolean>(false);

  // Add a new state variable to keep track of the container that was clicked
  // for the ListActionsCard component
  const [activeContainer, setActiveContainer] = useState<string | null>(null);

  // Update the onDotsClick handler to set the active container
  const handleDotsClick = (containerName: string) => {
    setActiveContainer(containerName);
    setIsListActionsCardVisible(true);
  };

  // State to manage collapse for each container
  const [collapsedContainers, setCollapsedContainers] = useState<
    Record<string, boolean>
  >({
    todo: false,
    inProgress: false,
    completed: false,
  });

  // Function to toggle collapse state
  const handleToggleCollapse = (containerName: string) => {
    setCollapsedContainers((prev) => ({
      ...prev,
      [containerName]: !prev[containerName],
    }));
  };

  /**
   * Effect to initialize client-side state and set up event listeners
   */
  useEffect(() => {
    setIsClient(true);
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    // Resize sidebar when adjusting screen size
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /**
   * Effect to save tasks to localStorage when they change
   */
  // useEffect(() => {
  //   if (isClient) {
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
  // }, [tasks, isClient]);

  /**
   * Moves a task from one container to another
   * @param {string} id - The ID of the task to move
   * @param {keyof TaskList} currentContainer - The current container of the task
   * @param {keyof TaskList} newContainer - The new container for the task
   */
  const moveTask = (
    id: string,
    currentContainer: keyof TaskList,
    newContainer: keyof TaskList
  ) => {
    setTasks((prevTasks) => {
      const taskToMove = prevTasks[currentContainer].find(
        (task) => task.id === id
      );

      if (!taskToMove) return prevTasks;

      if (currentContainer === newContainer) {
        return prevTasks;
      }

      const updatedFromTasks = prevTasks[currentContainer].filter(
        (task) => task.id !== id
      );
      const updatedToTasks = [...prevTasks[newContainer], taskToMove];

      return {
        ...prevTasks,
        [currentContainer]: updatedFromTasks,
        [newContainer]: updatedToTasks,
      };
    });
  };

  /**
   * Toggles the retraction state of the left sidebar
   */
  const toggleLeftDiv = () => {
    setIsLeftDivRetracted(!isLeftDivRetracted);
  };

  /**
   * Handles the window resize event to adjust the sidebar state
   */
  const handleResize = () => {
    if (window.innerWidth < 1400) {
      setIsLeftDivRetracted(true);
    } else {
      setIsLeftDivRetracted(false);
    }
  };

  // Return null if not on client-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col justify-center items-center">
        <Navbar />

        {/* Overlay for greyed out background */}
        {isListActionsCardVisible && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-30 z-10"
            onClick={() => setIsListActionsCardVisible(false)}
          />
        )}

        <div className="w-full h-[103vh] flex">
          <TaskManagementSidebar
            isLeftDivRetracted={isLeftDivRetracted}
            toggleLeftDiv={toggleLeftDiv}
          />

          {/* Right side container  */}
          <div className="w-full h-full ">
            {/* Black bar */}
            <div className="w-full h-10 md:h-49 bg-[#282624]"></div>

            <div className="flex-grow flex-col rounded-[20px] max-w-full pl-9 sm:mx-4 px-6  bg-gray-100 mt-2 shadow-lg shadow-neutral-400 ">
              {/* Project header section */}
              <div className="py-2 flex justify-between flex-wrap">
                {/* Project name and progress bar */}
                <div className="flex-col flex sm:flex-row items-center w-full sm:w-auto">
                  <div className="flex items-center h-full ">
                    <div className="flex items-center">
                      <h1 className="text-black text-xl md:text-2xl font-extrabold">
                        Project name
                      </h1>
                    </div>
                  </div>

                  <div className="flex gap-1 pl-5 pt-1 sm:pt-0 items-center flex-wrap">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-4 w-4 md:h-5 md:w-10 ${
                          index < Number(projectProgressBar)
                            ? index === 0
                              ? "bg-yellow-300"
                              : index === 1
                              ? "bg-yellow-200"
                              : index === 2
                              ? "bg-lime-200"
                              : index === 3
                              ? "bg-lime-300"
                              : index === 4
                              ? "bg-lime-400"
                              : "bg-lime-500"
                            : "bg-[#CFCBC6]"
                        } ${
                          index === 0
                            ? "rounded-l-full"
                            : index === 5
                            ? "rounded-r-full"
                            : ""
                        }`}
                      />
                    ))}

                    <div className="relative pl-2 sm:pl-5">
                      <Image src={grayBellIcon} alt="bell icon" />
                    </div>

                    {/* Assignees icons */}
                    <div className="flex items-center h-[30px] space-x-[-12px] ml-10 relative mt-2 sm:mt-0">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          BIO
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">OM</span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MP</span>
                      </div>

                      <div className="absolute -right-[1px] top-[25px] w-[8px] h-[8px] rounded-full bg-green-400 border border-black"></div>
                    </div>

                    <div className="flex items-center px-4 pl-20">
                      <Image
                        src={lock}
                        alt="lock icon"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <p className="text-black ml-2 text-sm md:text-base">
                        Logged
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="mt-1 sm:hidden" />

              {/* Project buttons */}
              <div className=" sm:flex sm:gap-6 text-[#827E79] font-semibold text-lg ">
                <button className="flex items-center gap-2 hover:bg-[#dddcdb] hover:rounded-lg px-2">
                  <Image
                    src={listIcon}
                    alt="list icon"
                    style={{ width: "auto", height: "auto" }}
                  />
                  List
                </button>

                <button className="flex items-center gap-2 hover:bg-[#dddcdb] hover:rounded-lg px-2">
                  <Image
                    src={boardIcon}
                    alt="board icon"
                    style={{ width: "auto", height: "auto" }}
                  />
                  Board
                </button>

                <button className="flex items-center gap-2 hover:bg-[#dddcdb] hover:rounded-lg px-2">
                  <Image
                    src={calendarIcon}
                    alt="calendar icon"
                    style={{ width: "auto", height: "auto" }}
                  />
                  Calendar
                </button>

                <button className="flex items-center gap-2 hover:bg-[#dddcdb] hover:rounded-lg px-2">
                  <Image
                    src={moreViewsIcon}
                    alt="more views icon"
                    style={{ width: "auto", height: "auto" }}
                  />
                  more views
                </button>
              </div>

              {/* Task containers section */}
              <div className="flex py-5 gap-4 flex-wrap">
                {containerNames.map((containerName) => (
                  <div key={containerName} id={containerName}>
                    {isListActionsCardVisible &&
                      activeContainer === containerName && (
                        <div className="absolute  sm:ml-12 z-10">
                          <ListActionsCard
                            onClose={() => setIsListActionsCardVisible(false)}
                          />
                        </div>
                      )}

                    <TaskContainer
                      title={`${containerName
                        .charAt(0)
                        .toUpperCase()}${containerName.slice(1)}`}
                      //@ts-ignore
                      tasks={tasks[containerName]}
                      moveTask={moveTask}
                      //@ts-ignore
                      containerName={containerName}
                      onAddTask={() => setShowAddTask(containerName)}
                      buttonText="Add Task"
                      buttonIcon={plus}
                      onDotsClick={() => handleDotsClick(containerName)}
                      isCollapsed={collapsedContainers[containerName]}
                      onToggleCollapse={() =>
                        handleToggleCollapse(containerName)
                      }
                      showAddTask={showAddTask}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}