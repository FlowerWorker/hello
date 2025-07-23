"use client";
import React from "react";
import { Star, Clock, DollarSign } from "lucide-react";
import type { ProjectTask } from "../../../app/browse-task/page";

interface TaskCardProps {
  task: ProjectTask;
  onTaskClick: (task: ProjectTask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const formatBudget = (budget: number) => {
    if (budget >= 1000) {
      return `$${(budget / 1000).toFixed(0)}k`;
    }
    return `${budget}`;
  };

  const formatDeadline = (deadline: string | number | Date) => {
    const days = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (days === 1) return "1 day left";
    if (days > 1) return `${days} days left`;
    return "Deadline passed";
  };

  return (
    <div className=" p-6  cursor-pointer" onClick={() => onTaskClick(task)}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 pr-4">
            {task.title}
          </h3>
        </div>
        <div className="flex items-center">
          <div className="flex mr-3">{renderStars(task.clientRating)}</div>
          <span className="text-green-500 font-medium text-sm">
            {task.matchPercentage || 80}% match
          </span>
        </div>
      </div>

      <hr className="border-purple-500 mb-4" />

      {/* Budget and Deadline Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">
            Budget: {formatBudget(task.budget)}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">Deadline: {task.deadline}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 text-sm">
          <span className="font-medium">Description:</span> {task.description}
        </p>
      </div>

    
      <div className="flex items-center justify-end pt-4 border-t border-gray-100">
        {/* Action Buttons */}
        <div className="flex gap-2 mb-5  ">
          <button className="px-4 py-2   purple-text border button-border-color rounded-full text-sm">
            Save
          </button>
          <button className="px-4 py-2 purple-bg text-white rounded-full text-sm ">
            Apply
          </button>
        </div>
      </div>
        {/* AI Optimization Badge */}
      {task.isAiOptimized && (
        <div className="mb-4 flex items-center justify-end text-xs purple-text ">
          <span className="mr-1">⚡</span>
          <span className=" font-bold underline">Optimize My Application with AI</span>
        </div>
      )}

      <hr className="bottom-hr" />
    </div>
  );
};

export default TaskCard;
