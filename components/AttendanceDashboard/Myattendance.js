import React from "react";
import styles from "./myattendance.module.css";

const MyAttendance = () => {
  const attendanceData = [
    {
      date: "04 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
    {
      date: "03 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
    {
      date: "04 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
    {
      date: "03 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
    {
      date: "04 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
    {
      date: "03 Apr 2025",
      timeIn: "NA",
      timeOut: "NA",
      status: "present",
    },
  ];

  return (
    <div className={styles.attendanceContainer}>
      {attendanceData.map((entry, index) => (
        <div key={index} className={styles.attendanceCard}>
          <div className={styles.date}>{entry.date}</div>
          <div className={styles.details}>
            <div className={styles.time}>Time In: {entry.timeIn}</div>
            <div className={styles.time}>Time Out: {entry.timeOut}</div>
            <div className={styles.status}>
              Status: <span>{entry.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAttendance;
