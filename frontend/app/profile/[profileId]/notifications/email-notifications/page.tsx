const EmailNotification: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md max-w-lg mx-auto">
      <p className="text-lg font-semibold mb-4">Email Notifications</p>
      <p className="text-sm text-gray-600 mb-4">Receive emails about unread messages after a period of inactivity.</p>
      <div className="flex ">
        <select className="form-select w-40 border border-black rounded-md shadow-sm focus:border-blue-500 focus:ring ">
          <option value="Every day">Every day</option>
          <option value="Weekdays">Weekdays</option>
        </select>
      </div>
    </div>
  );
};

export default EmailNotification;
