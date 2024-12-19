"use client";
import { useState } from "react";
import styles from "../styles/TimeZone.module.css";

const TimeZoneSettings = () => {
  const [timeZone, setTimeZone] = useState("(UTC 01:00) Europe/Madrid");
  const [autoTimeZone, setAutoTimeZone] = useState(false);

  const handleSave = () => {
    alert(`Time Zone: ${timeZone}\nSet Automatically: ${autoTimeZone}`);
  };

  return (
    <div className={styles.container}>
      {/* Time Zone Dropdown */}
      <div className={styles.dropdown}>
        <h2 className={styles.dropdownhead}>Time Zone</h2>
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-purple-500">
          <option value="(UTC 01:00) Europe/Madrid">(UTC 01:00) Europe/Madrid</option>
          <option value="(UTC 00:00) Europe/London">(UTC 00:00) Europe/London</option>
          <option value="(UTC +02:00) Europe/Berlin">(UTC +02:00) Europe/Berlin</option>
        </select>
      </div>
      {/* Checkbox */}
      <div className={styles.checkbox}>
        <input type="checkbox" checked={autoTimeZone} onChange={() => setAutoTimeZone(!autoTimeZone)} className="mr-2" />
        <label className="text-gray-700">Set time zone automatically</label>
      </div>
      {/* Buttons */}
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancel}`} onClick={() => alert("Canceled")}>Cancel</button>
        <button className={`${styles.button} ${styles.save}`} onClick={handleSave}> Save</button>
      </div>
    </div>
  );
};

export default TimeZoneSettings;
