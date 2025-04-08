"use client";

import React from "react";
import { IoClose } from "react-icons/io5"; // Import the close icon from react-icons

interface SelectPriorityProps {
  togglePriority: () => void; // Function to close the modal
  onSelectPriority: (priority: string | null) => void; // Function to handle priority selection
}

export default function SelectPriority({ togglePriority, onSelectPriority }: SelectPriorityProps) {
  const priorityOptions = [
    { name: "Critical", color: "bg-[#FF3B30]" }, // Red
    { name: "High", color: "bg-[#FF9500]" }, // Orange
    { name: "Medium", color: "bg-[#FFCC00]" }, // Yellow
    { name: "Low", color: "bg-[#34C759]" }, // Green
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] p-6 w-[300px] shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">Priority</h2>
            <p className="text-sm text-gray-500">Select a priority.</p>
          </div>
          <button
            onClick={togglePriority}
            aria-label="Close priority modal"
            className="focus:outline-none"
          >
            <IoClose className="w-5 h-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Priority Options */}
        <div className="flex flex-col gap-3">
          {priorityOptions.map((option) => (
            <button
              key={option.name}
              className={`w-full py-2 rounded-full text-white font-semibold ${option.color} hover:opacity-80 transition-opacity`}
              onClick={() => {
                onSelectPriority(option.name); // Pass selected priority
                togglePriority(); // Close modal after selection
              }}
            >
              {option.name}
            </button>
          ))}
        </div>

        {/* Clear Priority Button */}
        <button
          className="w-full py-2 mt-3 border border-gray-300 rounded-full text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
          onClick={() => {
            onSelectPriority(null); // Clear priority
            togglePriority(); // Close modal
          }}
        >
          Clear priority
        </button>
      </div>
    </div>
  );
}