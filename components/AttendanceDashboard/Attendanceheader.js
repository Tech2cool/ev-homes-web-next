"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./attendanceheader.module.css";

const Attendanceheader = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Attendance</h3>

      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search" className={styles.searchInput} />
        <button className={styles.searchButton}>
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default Attendanceheader;
