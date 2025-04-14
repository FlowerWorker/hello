"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

interface SelectPriorityProps {
  togglePriority: () => void;
  onSelectPriority: (priority: string | null) => void; // Ensure this matches the expected type
}

export default function SelectPriority({ togglePriority, onSelectPriority }: SelectPriorityProps) {
  const priorityOptions = [
    { name: "Critical", color: "bg-[#FF3B30]" },
    { name: "High", color: "bg-[#FF9500]" },
    { name: "Medium", color: "bg-[#FFCC00]" },
    { name: "Low", color: "bg-[#34C759]" },
  ];

  // Fallback to prevent error if onSelectPriority is not a function
  const handleSelect = (priority: string | null) => {
    if (typeof onSelectPriority === "function") {
      onSelectPriority(priority);
    } else {
      console.error("onSelectPriority is not a function");
    }
    togglePriority();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto py-4"
      onClick={togglePriority}
    >
      <div
        className="bg-white rounded-[20px] p-6 w-[300px] shadow-lg max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Priority</h2>
            <p className="text-sm text-gray-500">Select a priority.</p>
          </div>
          <button
            onClick={togglePriority}
            aria-label ="Close priority modal"
            className="focus:outline-none"
          >
            <IoClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Priority Options - Scrollable */}
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {priorityOptions.map((option) => (
            <button
              key={option.name}
              className={`w-full py-2 rounded-full text-white font-semibold ${option.color} hover:opacity-80 transition-opacity`}
              onClick={() => handleSelect(option.name)} // Use the wrapper function
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* Clear Priority Button */}
        <button
          className="w-full py-2 mt-3 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          onClick={() => handleSelect(null)} // Use the wrapper function
        >
          Clear priority
        </button>
      </div>
    </div>
  );
}