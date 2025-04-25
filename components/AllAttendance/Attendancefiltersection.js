"use client";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { DefinedRange } from "react-date-range";

import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import styles from "./attendancefiltersection.module.css";
import { FiSearch } from "react-icons/fi";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { HiOutlineSquares2X2, HiOutlineTableCells } from "react-icons/hi2";

const Attendancefiltersection = () => {
  const [viewType, setViewType] = useState("grid");
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const formattedDateRange = `${format(
    dateRange[0].startDate,
    "dd-MM-yyyy"
  )} - ${format(dateRange[0].endDate, "dd-MM-yyyy")}`;

  const formattedAdvancedDateRange = `${format(
    dateRange[0].startDate,
    "dd-MM-yyyy"
  )} - ${format(dateRange[0].endDate, "dd-MM-yyyy")}`;

  return (
    <div className={styles.filterSectionWrapper}>
      <div className={styles.filterSectionLeft}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Employee"
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch size={18} />
          </button>
        </div>

        <div className={styles.customDropdown} onClick={toggleCalendar}>
          <div className={styles.leftSide}>
            <FaCalendarAlt className={styles.icon} />
            <span className={styles.label}>{formattedDateRange}</span>
          </div>
          <FaChevronDown className={styles.arrowIcon} />
        </div>

        {showCalendar && (
          <div className={styles.calendarWrapper}>
            <div>
              <DefinedRange
                ranges={dateRange}
                onChange={handleSelect}
                rangeColors={["#007bff"]}
              />
            </div>

            <div>
              <DateRange
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={["#007bff"]}
                showSelectionPreview={true}
                months={1}
                direction="horizontal"
                editableDateInputs={true}
              />
              <button
                onClick={() => setShowCalendar(false)}
                className={styles.okButton}
                style={{ marginTop: "1rem" }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.toggleIcons}>
        <button
          onClick={() => setViewType("grid")}
          className={`${styles.toggleBtn} ${
            viewType === "grid" ? styles.active : ""
          }`}
        >
          <HiOutlineSquares2X2 size={18} />
        </button>
        <button
          onClick={() => setViewType("table")}
          className={`${styles.toggleBtn} ${
            viewType === "table" ? styles.active : ""
          }`}
        >
          <HiOutlineTableCells size={18} />
        </button>
      </div>
    </div>
  );
};

export default Attendancefiltersection;
