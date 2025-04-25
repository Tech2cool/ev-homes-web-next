"use client";
import React, { useState } from "react";
import styles from "./attendanceheader.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Attendanceheader = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.header}>Attendance</div>
        <div className={styles.dateSelector}>
          <button className={styles.arrowButton} onClick={handlePrevDay}>
            <FaChevronLeft />
          </button>
          <span className={styles.dateText}>{formattedDate}</span>
          <button className={styles.arrowButton} onClick={handleNextDay}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <button className={styles.reportButton}>Monthly Report</button>
    </div>
  );
};

export default Attendanceheader;
