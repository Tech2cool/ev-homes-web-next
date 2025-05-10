import React, { useRef, useState, useEffect } from "react";
import reimstyles from "./reimbursementFilterDialog.module.css";
import styles from "@/components/MyAttendanceSections/Forms/leaveform.module.css";
import attstyles from "@/components/AllAttendance/attendancefiltersection.module.css";
import { FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { DateRange } from "react-date-range";
import { DefinedRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useClickOutside } from "../useClickOutside";

export default function ReimbursementFilterDialog({ onClose, onApplyFilter }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dialogRef = useRef(null);

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
    setShowCalendar(false);
  };

  const formattedDateRange = `${format(
    dateRange[0].startDate,
    "dd-MM-yyyy"
  )} - ${format(dateRange[0].endDate, "dd-MM-yyyy")}`;

  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  useClickOutside({
    refs: [dialogRef],
    handler: onClose,
    active: true,
  });

  return (
    <div className={reimstyles.overlay}>
      <div className={reimstyles.dialog} ref={dialogRef}>
        <button onClick={onClose} className={reimstyles.closeButton}>
          ×
        </button>

        <div className={attstyles.customDropdown} onClick={toggleCalendar}>
          <div className={attstyles.leftSide}>
            <FaCalendarAlt className={attstyles.icon} />
            <span className={reimstyles.reimlabel}>{formattedDateRange}</span>
          </div>
          <FaChevronDown className={attstyles.arrowIcon} />
        </div>

        {showCalendar && (
          <div ref={calendarRef} className={attstyles.calendarWrapper}>
            <div
              style={{ transform: "scale(0.8)", transformOrigin: "top left" }}
            >
              <DefinedRange
                ranges={dateRange}
                onChange={handleSelect}
                rangeColors={["#007bff"]}
              />
            </div>

            <div
              style={{ transform: "scale(0.8)", transformOrigin: "top left" }}
            >
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
            </div>
          </div>
        )}

        <div className={styles.formControl}>
          <label htmlFor="select">Reimbursement Type </label>
          <select name="select" id="select">
            <option value="travel">Travel</option>
            <option value="phone">Phone</option>
            <option value="food">Food</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="select">Paid By</label>
          <select name="select" id="select">
            <option value="company">Company</option>
            <option value="emp">Employee</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="select">Status </label>
          <select name="select" id="select">
            <option value="pending">Pending</option>
            <option value="reject">Rejected</option>
            <option value="approve">Approved</option>
          </select>
        </div>
        <button
          className={reimstyles.applyButton}
          // onClick={() => onApplyFilter(selectedOption)}
        >
          Export
        </button>
      </div>
    </div>
  );
}
