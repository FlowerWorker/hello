'use client';

import { Button } from "../../common/Button";

const TimeZone: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Time Zone Settings</h2>
      <p className="text-gray-600 mb-6">Select your preferred time zone</p>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Time Zone</label>
        <select className="w-full p-2 border border-black rounded-lg focus:outline-none focus:ring focus:ring-blue-300">
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Time (ET)</option>
          <option value="CST">Central Time (CT)</option>
          <option value="MST">Mountain Time (MT)</option>
          <option value="PST">Pacific Time (PT)</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
};

export default TimeZone; 