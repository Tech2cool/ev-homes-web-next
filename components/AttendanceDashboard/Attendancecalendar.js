"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./attendancecalendar.module.css";

const AttendanceCalendar = () => {
  const [date, setDate] = useState(new Date());

  const attendanceData = {
    "2025-04-04": "present",
    "2025-04-03": "late",
    "2025-04-02": "absent",
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const formattedDate = date.toISOString().split("T")[0];
            return attendanceData[formattedDate] ? styles[attendanceData[formattedDate]] : "";
          }
          return "";
        }}
        className={styles.customCalendar}
      />
    </div>
  );
};

export default AttendanceCalendar;
