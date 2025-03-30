import React, { useState } from "react";

const PrioritySelector: React.FC = () => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCode, setShowCode] = useState(false); // New state for showing code

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
      <div className="space-y-8">
        {/* Button to select priority */}
        <button
          onClick={() => setShowCode(true)} // Toggle showCode state
          className="bg-gray-700 px-4 py-2 rounded-md text-white"
        >
          Select priority
        </button>

        {/* Code Display Modal */}
        {showCode && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg p-6 w-[90%] md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex justify-between items-center bg-black text-white p-3 rounded-t-md">
                <h3 className="text-lg font-bold">Priority Selector Code</h3>
                <button
                  onClick={() => setShowCode(false)}
                  className="text-gray-500 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              <pre className="bg-gray-900 text-white p-4 rounded-md text-sm overflow-auto max-h-96">
                {`
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="space-y-8">
        <button onClick={() => setIsEditing(true)} className="bg-gray-700 px-4 py-2 rounded-md text-white">
          Select priority
        </button>
      </div>
    </div>
  );
};

export default PrioritySelector;
                `}
              </pre>
            </div>
          </div>
        )}

        {/* Other UI Elements */}
        <div className="space-y-2">
          {priorities.map((priority) => (
            <div
              key={priority.label}
              className={`${priority.color} w-48 text-white px-4 py-2 rounded-md`}
            >
              {priority.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrioritySelector;