"use client";

import { useState } from "react";
import Image from "next/image";
import mockTasks from "@/app/sampleData/mockTasks";
import MobileSidebar from "@/app/components/layout/MobileSidebarWrapper";
import Logo from "@/public/gaddr.svg";
import User from "@/app/public/user-icons/profileImage.png";
import Menu from "@/public/sidebar-icon.svg";
import Board from "@/public/Board-icon.png";
import { ChevronDown, Lock, Bell, Calendar, Users, Paperclip, Plus, File, Eye, AlertCircle } from "lucide-react";

export default function TaskManagementDashboardMobile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"todo" | "inProgress" | "completed">("inProgress");
  const [projectProgressBar] = useState<number>(5);
  const [tasks, setTasks] = useState(mockTasks);
  const [showAddTask, setShowAddTask] = useState<string | null>(null);

  const tabs = [
    { id: "todo", label: "To do" },
    { id: "inProgress", label: "In progress" },
    { id: "completed", label: "Completed" },
  ];

  const renderTaskCard = (task: any) => (
    <div
      key={task.id}
      className="rounded-lg border border-[#9C2BBF] bg-white p-4 space-y-3 shadow-[0_4px_12px_rgba(181,125,228,0.3)] mt-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900">{task.name}</h2>
          <p className="text-sm text-neutral-700 mt-0.5">
            <span className="inline-flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              in list <span className="italic underline">{task.listName}</span>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" aria-label="Complete task" />
          <button aria-label="More options">⋯</button>
          <Bell size={16} />
        </div>
      </div>

      <div className="relative">
  <div className="absolute left-0 right-0 h-[1px] bg-[#C5C1BB] top-0" />
</div>

<div className="flex items-start justify-between">
<div className="flex gap-2 pt-4 pb-2 pl-2 items-center">
          <File className="w-4 h-4 text-gray-500" />
          <Paperclip className="w-4 h-4 text-gray-500" />
          <Eye className="w-4 h-4 text-gray-500" />
        </div>
</div>

<div className="relative">
  <div className="absolute left-0 right-0 h-[1px] bg-[#C5C1BB] top-0" />
</div>

      <div className="flex justify-between items-start text-sm p-3 pl-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-neutral-600 text-[#827E79]">Assignees:</span>
            <div className="flex -space-x-2">
              {task.assignees.map((a: any, idx: number) => {
                const initials = a.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2);
                return (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full text-xs flex items-center justify-center text-white border-2 border-white bg-pink-400`}
                  >
                    {initials}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-1 text-neutral-700">
            <span className="font-medium ">Deadline:</span>
            {task.deadline}
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-1 items-center">
          <Calendar className="w-4 h-4 text-gray-500" />
          <Users className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="relative">
  <div className="absolute left-0 right-0 h-[1px] bg-[#C5C1BB] top-0" />
</div>

      <div className="flex flex-col pt-3 items-left">
        {["Attach a file", "Select a priority", "Add description", "Add watchers", "Add labels", "Add a subtask"].map(
          (label, idx) => (
            <div
              key={idx}
              className="flex items-center text-xs text-muted-foreground gap-2 p-1"
            >
              <Paperclip size={14} />
              {label}
            </div>
          )
        )}
      </div>

      <div className="flex justify-center text-neutral-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );

  return (
    <div
      className="relative font-montserrat overflow-x-hidden pb-15 min-h-[300px]"
      style={{
        background: "linear-gradient(180deg, #282625 0%, #6E1F87 16%)",
      }}>

      {/* Header */}
      <div className="w-full flex justify-between items-center px-4 py-3 text-white z-20 relative">
        <div className="flex items-center gap-3">
          <Image src={Logo} alt="Logo" width={100} height={20} className="h-[25px] w-auto" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 relative">
            <Bell size={23} color="#fff" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="w-[18px] h-[18px] rounded-full bg-[#20CF89] shadow-inner" />
          <div className="w-8 h-8 relative overflow-hidden">
            <Image src={User} alt="User" fill className="object-cover rounded-full" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full z-10" />
          </div>
        </div>
      </div>

      {/* Workspace info */}
      <div className="w-full px-0 pt-0 pb-11">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="ml-0 pl-0 pr-0.35">
            <Image src={Menu} alt="Menu" width={24} height={24} />
          </button>
          <div className="w-10 h-10 bg-[#F8C1D3] rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-2xl">K.</span>
          </div>
          <span className="text-white text-base font-bold mt-[-4px]">Workspace name</span>
        </div>
      </div>



      {/* 第一层：Project Info 卡片 */}
      <div className="bg-white rounded-t-2xl border-b mt-5 border-[#E6E3E8] shadow-sm">
      <div className="px-6 pt-4 pb-12">
  <div className="flex justify-between items-start">
    {/* 左侧：标题与 Board */}
    <div className="flex flex-col justify-between h-[96px]">
      <h1 className="text-[#282624] text-xl font-bold">Project name</h1>
      <div className="flex items-center gap-2">
        <Image src={Board} alt="Board" width={16} height={16} />
        <span className="text-sm text-[#827E79]">Board</span>
      </div>
    </div>

    {/* 右侧：进度条、状态、头像堆叠 */}
    <div className="flex flex-col items-end gap-5">
      {/* 进度条 */}
      <div className="flex gap-[2px]">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`w-5 h-2 rounded-full ${
              i < Math.round(projectProgressBar / 14.3)
                ? "bg-[#B57DE4]"
                : "bg-[#E6E3E8]"
            }`}
          />
        ))}
      </div>

      {/* 状态图标 + Logged */}
      <div className="flex items-center gap-2">
      <Bell size={16} />
      <Lock size={16} />
        <span className="text-sm text-[#282624]">Logged</span>
      </div>

      {/* 头像堆叠 */}
      <div className="flex -space-x-2">
  <div className="w-8 h-8 bg-[#F8C1D3] text-xs font-bold text-black flex items-center justify-center rounded-full border-2 border-white">
    JD
  </div>
  <div className="w-8 h-8 bg-[#A7D9F2] text-xs font-bold text-black flex items-center justify-center rounded-full border-2 border-white">
    MP
  </div>
  <div className="w-8 h-8 bg-[#A0E3DA] text-xs font-bold text-black flex items-center justify-center rounded-full border-2 border-white">
    MP
  </div>
</div>

    </div>
  </div>

  {/* 分割线 */}
  <div className="absolute left-0 right-0 h-[1px] bg-[#C5C1BB] mt-4" />
</div>



  

      {/* Tabs */}
      <div className="bg-[#F8F6FA] rounded-xl mx-4 mb-2 p-2">
        <div className="flex justify-between items-center relative w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "todo" | "inProgress" | "completed")}
              className={`relative px-4 py-2 text-sm font-bold transition-all duration-150 rounded-xl border ${
                activeTab === tab.id
                  ? "bg-white text-[#1C1B1F] border-[#D4C1E8]"
                  : "bg-[#EDE9E3] text-[#A29DA5] border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="max-w-sm mx-auto">
        {tasks[activeTab].map((task) => renderTaskCard(task))}
        <button
          className="w-full mt-4 py-2 border border-dashed border-[#9C2BBF] rounded-lg text-[#9C2BBF] font-semibold flex justify-center items-center gap-2"
          onClick={() => {
            const newTask = {
              id: String(Date.now()),
              name: "New Task",
              assignees: [{ id: 99, name: "New User" }],
              deadline: "2025-12-31",
              subtask: 0,
              labelNames: ["Low"],
              position: tasks[activeTab].length + 1,
              listName: activeTab === "inProgress" ? "in progress" : activeTab,
            };
            setTasks({
              ...tasks,
              [activeTab]: [...tasks[activeTab], newTask],
            });
          }}
        >
          <Plus size={16} /> Add Task
        </button>
      </div>

      <MobileSidebar isVisible={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
    </div>
  );
}
