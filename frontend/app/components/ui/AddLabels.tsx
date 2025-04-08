// components/AddLabels.tsx
import { useState, Dispatch, SetStateAction } from "react";

interface Label {
  name: string;
  color: string;
}

interface AddLabelsProps {
  toggleLabelManager: () => void;
  isCreateLabelOpen: boolean;
  setIsCreateLabelOpen: Dispatch<SetStateAction<boolean>>;
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
  selectedLabels: string[];
  setSelectedLabels: Dispatch<SetStateAction<string[]>>;
}

const AddLabels: React.FC<AddLabelsProps> = ({
  toggleLabelManager,
  isCreateLabelOpen,
  setIsCreateLabelOpen,
  labels,
  setLabels,
  selectedLabels,
  setSelectedLabels,
}) => {
  const [newLabelName, setNewLabelName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const colors: string[] = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD",
    "#D4A5A5", "#9B59B6", "#3498DB", "#E74C3C", "#2ECC71",
    "#F1C40F", "#E67E22", "#1ABC9C", "#34495E", "#7F8C8D",
  ];

  const handleOpenCreateLabel = () => {
    setIsCreateLabelOpen(true);
  };

  const handleSaveLabel = () => {
    if (newLabelName && selectedColor) {
      const newLabel: Label = { name: newLabelName, color: selectedColor };
      setLabels([...labels, newLabel]);
      setNewLabelName("");
      setSelectedColor("");
      setIsCreateLabelOpen(false);
    }
  };

  const handleCancelCreate = () => {
    setNewLabelName("");
    setSelectedColor("");
    setIsCreateLabelOpen(false);
  };

  const handleRemoveColor = () => {
    setSelectedColor("");
  };

  const handleLabelToggle = (labelName: string) => {
    if (selectedLabels.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter((name) => name !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  };

  const handleSaveSelection = () => {
    toggleLabelManager(); // Close the AddLabels component
  };

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add Labels</h2>
        <button onClick={toggleLabelManager} className="text-gray-500">
          ✕
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Labels
        </label>
        {filteredLabels.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filteredLabels.map((label, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedLabels.includes(label.name)}
                  onChange={() => handleLabelToggle(label.name)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div
                  className="w-8 h-4 rounded"
                  style={{ backgroundColor: label.color }}
                ></div>
                <span>{label.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            You don’t have any labels created.
          </p>
        )}
      </div>

      <button
        onClick={handleOpenCreateLabel}
        className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 mb-4"
      >
        Create a label
      </button>

      <div className="flex justify-end space-x-2">
        <button
          onClick={toggleLabelManager}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveSelection}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      {/* Create Label Modal */}
      {isCreateLabelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create a label</h3>
              <button onClick={handleCancelCreate} className="text-gray-500">
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="Give the label a name..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select a color
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
              {selectedColor && (
                <button
                  onClick={handleRemoveColor}
                  className="mt-2 w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100"
                >
                  Remove color
                </button>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancelCreate}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLabel}
                disabled={!newLabelName || !selectedColor}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLabels;