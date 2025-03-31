import React, { useState } from "react";

const PrioritySelector: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const priorities = [
    { label: "Critical", color: "bg-red-500" },
    { label: "High", color: "bg-orange-400" },
    { label: "Medium", color: "bg-yellow-300" },
    { label: "Low", color: "bg-green-400" },
  ];

  const handlePriorityClick = (priority: string) => {
    setSelectedPriority(priority);
    setIsEditing(false);
  };

  const handleClearPriority = () => {
    setSelectedPriority(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      <div className="space-y-8 text-center">
        {/* Select Priority Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gray-700 px-4 py-2 rounded-md text-white hover:bg-gray-600"
        >
          Select a priority
        </button>

        {/* Priority Selection Modal */}
        {isEditing && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-white text-black rounded-lg p-6 w-72 space-y-4 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Priority</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-black text-2xl"
                >
                  &times;
                </button>
              </div>
              <p>Select a priority.</p>
              <div className="space-y-2">
                {priorities.map((priority) => (
                  <button
                    key={priority.label}
                    onClick={() => handlePriorityClick(priority.label)}
                    className={`${priority.color} w-full text-white py-2 rounded-md hover:opacity-80 font-bold`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
              <button
                onClick={handleClearPriority}
                className="w-full bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300"
              >
                Clear priority
              </button>
            </div>
          </div>
        )}

        {/* Display Available Priorities */}
        <div className="border border-purple-500 p-4 rounded-lg space-y-2">
          {priorities.map((priority) => (
            <div
              key={priority.label}
              className={`${priority.color} w-48 text-white px-4 py-2 rounded-md font-bold text-center`}
            >
              {priority.label}
            </div>
          ))}
        </div>

        {/* Selected Priority Display */}
        <div className="border border-purple-500 p-4 rounded-lg space-y-2">
          {selectedPriority ? (
            <div
              className={`${
                priorities.find((p) => p.label === selectedPriority)?.color
              } w-48 text-white px-4 py-2 rounded-md flex justify-between items-center font-bold`}
            >
              <span>{selectedPriority}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="underline text-sm hover:opacity-80"
              >
                ✏️
              </button>
            </div>
          ) : (
            <div className="text-gray-500">No priority selected.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrioritySelector;
