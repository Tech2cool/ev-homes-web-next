import React, { useState } from "react";
import styles from "./attendancesection.module.css";
import { FiSearch } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  { title: "Present", value: 12 },
  { title: "Absent", value: 6 },
  { title: "On Leave", value: 21 },
  { title: "Week Off", value: 2 },
  { title: "Half Day", value: 1 },
  { title: "Pending", value: 2 },
];

const TimelineSection = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  return (
    <div>
      <div className={styles.container}>
        {data.map((item, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.headerContainer}>
        <div className={styles.monthPicker}>
          <button className={`${styles.tab} ${styles.active}`}>
            Your Attendance
          </button>
          <div className={styles.monthPickerWrapper}>
            <IoCalendar className={styles.calendarIcon} />
            <DatePicker
              selected={selectedMonth}
              onChange={(date) => setSelectedMonth(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              className={styles.monthInput}
            />
          </div>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by Status"
            className={styles.searchInput}
            // value={query}
            // onChange={onChangeSearch}
          />
          <button className={styles.searchButton}>
            <FiSearch size={18} />
          </button>
        </div>
      </div>
      <div className={styles.attList}>
        <AttendanceSection
          date="Today"
          shiftHours="8"
          shiftTimeIn="10:00 AM"
          shiftTimeOut="6:00 PM"
          timeIn=""
          expectedTimeOut=""
          timeOut=""
          total=""
          overtime=""
          weekoff=""
          holiday=""
          onLeave=""
        />
      </div>
    </div>
  );
};

const AttendanceSection = ({
  date,
  timeIn,
  timeOut,
  total,
  overtime,
  expectedTimeOut,
  shiftTimeOut,
  shiftTimeIn,
  status,
  weekoff,
  onLeave,
  holiday,
}) => {
  const parseTime = (timeStr) => {
    if (!timeStr || typeof timeStr !== "string") return null;

    const [time, modifier] = timeStr.split(" ");
    if (!time || !modifier) return null;

    let [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours + minutes / 60;
  };

  const startTimeIn = parseTime(timeIn);
  const endTimeOut = parseTime(timeOut);
  const shiftEnd = parseTime(shiftTimeOut);
  const shiftStart = parseTime(shiftTimeIn);
  const workingEnd = parseTime(expectedTimeOut);

  const visibleEndTime = endTimeOut - shiftStart;
  const visibleWhenPending = workingEnd - shiftStart;

  const actualEnd = endTimeOut ?? workingEnd ?? shiftEnd;
  const visibleEnd2 = Math.max(shiftEnd || 0, workingEnd || 0, actualEnd || 0);
  const visibleDuration2 = visibleEnd2 - (shiftStart || 0);

  const visibleEnd = Math.max(shiftEnd, workingEnd);
  const visibleDuration = visibleEnd - shiftStart;

  const isPending = !timeOut || timeOut.trim() === "";

  // late coming
  const lateDuration = Math.max(0, startTimeIn - shiftStart);
  const latePercent = (lateDuration / visibleDuration) * 100;

  // working time
  const workingDuration = Math.max(
    0,
    Math.min(endTimeOut, workingEnd) - Math.max(startTimeIn, shiftStart)
  );
  const workingPercent = (workingDuration / visibleDuration) * 100;

  // overtime working
  const overtimeDuration = Math.max(0, endTimeOut - workingEnd);
  const overtimePercent = (overtimeDuration / visibleDuration) * 100;

  // expected working time
  const expectedWorkingDuration = Math.max(0, workingEnd - shiftEnd);
  const expectedWorkingPercent =
    (expectedWorkingDuration / visibleDuration) * 100;

  return (
    <div className={styles.timelineRow}>
      <div className={styles.dateSection}>
        <div className={styles.date}>{date}</div>
        <div className={styles.clockText}>
          <div>Time-in: {timeIn}</div>
        </div>
        <div className={styles.statusClockText}>
          <div>Status: {status} </div>
        </div>
      </div>
      <div className={styles.timeInImage}>
        <img
          src={
            // emp.timeOutImage ||
            "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
          }
          className={styles.cardTimeImage}
          alt="Time In"
        />
      </div>
      <div className={styles.barWrapper}>
        <div className={styles.barSection}>
          <div className={styles.bar}>
            {!timeIn &&
            !timeOut &&
            weekoff !== "true" &&
            onLeave !== "true" &&
            holiday !== "true" ? (
              <div className={styles.absentBar}>
                <span className={styles.barLabel}>Absent</span>
              </div>
            ) : weekoff === "true" && !timeIn && !timeOut ? (
              <div className={styles.weekOffBar}>
                <span className={styles.barLabel}>Requested Week off</span>
              </div>
            ) : onLeave === "true" ? (
              <div className={styles.leaveBar}>
                <span className={styles.barLabel}>On Leave</span>
              </div>
            ) : holiday === "true" && !timeIn && !timeOut ? (
              <div className={styles.holidayBar}>
                <span className={styles.barLabel}>Holiday</span>
              </div>
            ) : (
              <>
                {lateDuration > 0 && (
                  <div
                    className={styles.lateArrivalBar}
                    style={{ width: `${latePercent}%` }}
                  >
                    {latePercent > 3 && (
                      <span className={styles.barLabel}>Late</span>
                    )}
                  </div>
                )}

                {timeIn && !timeOut && (
                  <div
                    className={styles.pendingTimeBar}
                    style={{
                      left: `${
                        ((startTimeIn - shiftStart) / visibleWhenPending) * 100
                      }%`,
                      width: `${
                        ((workingEnd - startTimeIn) / visibleWhenPending) * 100
                      }%`,
                    }}
                  >
                    <span className={styles.barLabel}>Pending</span>
                  </div>
                )}

                {workingDuration > 0 && (
                  <div
                    className={
                      weekoff === "true" && timeIn && timeOut
                        ? styles.workingOnWeekoffBar
                        : holiday === "true" && timeIn && timeOut
                        ? styles.workingOnHolidayBar
                        : styles.workingTimeBar
                    }
                    style={{ width: `${workingPercent}%` }}
                  >
                    {workingPercent > 5 && (
                      <span className={styles.barLabel}>
                        {weekoff === "true" && timeIn && timeOut
                          ? "Working on Weekoff"
                          : holiday === "true" && timeIn && timeOut
                          ? "Working on Holiday"
                          : "Working Time"}
                      </span>
                    )}
                  </div>
                )}

                {expectedWorkingDuration > 0 && (
                  <div
                    className={styles.expectedWorkingTimeBar}
                    style={{ width: `${expectedWorkingPercent}%` }}
                  >
                    {expectedWorkingPercent > 5 && (
                      <span className={styles.barLabel}>working</span>
                    )}
                  </div>
                )}

                {overtimeDuration > 0 && (
                  <div
                    className={styles.overtimeBar}
                    style={{ width: `${overtimePercent}%` }}
                  >
                    {overtimePercent > 5 && (
                      <span className={styles.barLabel}>Overtime</span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className={styles.timeLabels}>
            <span className={`${styles.fixedLabel}`} style={{ left: "0%" }}>
              {shiftTimeIn}
              <span className={styles.tooltip}>Your shift start time</span>
            </span>

            {startTimeIn !== shiftStart && (
              <span
                className={`${styles.dynamicLabel} ${styles.aboveBar}`}
                style={{
                  left: `${
                    ((startTimeIn - shiftStart) / visibleDuration) * 100
                  }%`,
                }}
              >
                {timeIn}
                <span className={styles.tooltip}>Your Time In</span>
              </span>
            )}

            <span
              className={`${styles.fixedLabel}`}
              style={
                weekoff === "true" ||
                onLeave === "true" ||
                holiday === "true" ||
                (!timeIn && !timeOut)
                  ? {
                      left: "100%",
                      transform: "translateX(-100%)",
                    }
                  : {
                      left: `${
                        ((shiftEnd - shiftStart) /
                          (isPending ? visibleWhenPending : visibleEndTime)) *
                        100
                      }%`,
                      transform: "translateX(-50%)",
                    }
              }
            >
              6:00PM
              <span className={styles.tooltip}>Your Shift End Time</span>
            </span>

            <span
              className={`${styles.dynamicExpectedLabel} ${styles.aboveBar}`}
              style={{
                left: `${
                  ((workingEnd - shiftStart) / visibleDuration2) * 100
                }%`,
              }}
            >
              {expectedTimeOut}
              <span className={styles.tooltip}>Your Expected Time Out</span>
            </span>

            <span
              className={`${styles.dynamicTimeOutLabel} `}
              style={{
                left: `${((endTimeOut - shiftStart) / visibleEndTime) * 100}%`,
              }}
            >
              {timeOut}
              <span className={styles.tooltip}>Your Time Out</span>
            </span>
          </div>
        </div>
      </div>
      <div className={styles.timeOutImage}>
        <img
          src={
            // emp.timeOutImage ||
            "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
          }
          className={styles.cardTimeImage}
          alt="Time In"
        />
      </div>
      <div className={styles.detailsSection}>
        <div className={styles.clockText}>
          <div>Time-out: {timeOut}</div>
        </div>
        <div className={styles.clockText}>
          <div>Total: {total}</div>
        </div>
        <div className={styles.clockText}>
          <div>Overtime: {overtime}</div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
