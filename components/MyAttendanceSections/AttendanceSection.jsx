import React from "react";
import styles from "./attendancesection.module.css";

const data = [
  { title: "Present", value: 12 },
  { title: "Absent", value: 6 },
  { title: "On Leave", value: 21 },
  { title: "Week Off", value: 2 },
  { title: "Half Day", value: 1 },
  { title: "Pending", value: 2 },
];

const TimelineSection = () => {
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
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>
            Your Attendance
          </button>
        </div>
      </div>
      <div className={styles.attList}>
        <AttendanceSection
          date="Today"
          shiftHours="8"
          shiftTimeIn="10:00 AM"
          shiftTimeOut="6:00 PM"
          timeIn="10:50 AM"
          expectedTimeOut="6:50 PM"
          timeOut="07:10 PM"
          total="8h 51m"
          overtime="1h 21m"
          status="present"
        />
        <AttendanceSection
          date="Today"
          shiftHours="8"
          shiftTimeIn="10:00 AM"
          shiftTimeOut="6:00 PM"
          timeIn="10:17 AM"
          expectedTimeOut="07:50 PM"
          timeOut="07:56 PM"
          total="8h 51m"
          overtime="1h 21m"
        />

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
          weekoff="true"
        />
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
          onLeave="true"
        />
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
          onLeave=""
          holiday="true"
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
  status,
  weekoff,
  onLeave,
  holiday,
}) => {
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    return hours + minutes / 60;
  };

  const start = parseTime(timeIn);
  const end = parseTime(timeOut);
  const shiftEnd = parseTime(shiftTimeOut);
  const workingStart = 10;
  const workingEnd = parseTime(expectedTimeOut);

  // const totalDuration = end - start;
  const lateDuration = Math.max(0, start - workingStart);
  const workingDuration = Math.max(
    0,
    Math.min(end, workingEnd) - Math.max(start, workingStart)
  );
  const overtimeDuration = Math.max(0, end - workingEnd);

  const expectedWorkingDuration = Math.max(0, workingEnd - shiftEnd);

  const visibleDuration = end - workingStart;

  const latePercent = (lateDuration / visibleDuration) * 100;
  const workingPercent = (workingDuration / visibleDuration) * 100;
  const expectedWorkingPercent =
    (expectedWorkingDuration / visibleDuration) * 100;
  const overtimePercent = (overtimeDuration / visibleDuration) * 100;

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
      <div>
        <img
          src={
            // emp.timeOutImage ||
            "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
          }
          className={styles.cardTimeImage}
          alt="Time In"
        />
      </div>
      <div className={styles.barSection}>
        <div className={styles.barWrapper}>
          <div className={styles.bar}>
            {weekoff === "true" ? (
              <div className={styles.weekOffBar}>
                <span className={styles.barLabel}>Requested Week off</span>
              </div>
            ) : onLeave === "true" ? (
              <div className={styles.leaveBar}>
                <span className={styles.barLabel}>On Leave</span>
              </div>
            ) : holiday === "true" ? (
              <div className={styles.holidayBar}>
                <span className={styles.barLabel}>Holiday</span>
              </div>
            ) : (
              <>
                {lateDuration > 0 && (
                  <div
                    className={styles.lateArrival}
                    style={{ width: `${latePercent}%` }}
                  >
                    {latePercent > 3 && (
                      <span className={styles.barLabel}>Late</span>
                    )}
                  </div>
                )}

                {workingDuration > 0 && (
                  <div
                    className={styles.workingTime}
                    style={{ width: `${workingPercent}%` }}
                  >
                    {workingPercent > 5 && (
                      <span className={styles.barLabel}>Working Time</span>
                    )}
                  </div>
                )}

                {expectedWorkingDuration > 0 && (
                  <div
                    className={styles.expectedWorkingTime}
                    style={{ width: `${expectedWorkingPercent}%` }}
                  >
                    {expectedWorkingPercent > 1 && (
                      <span className={styles.barLabel}>working</span>
                    )}
                  </div>
                )}

                {overtimeDuration > 0 && (
                  <div
                    className={styles.overtime}
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
            <span
              className={`${styles.fixedLabel} ${styles.fixedStart}`}
              style={{ left: "0%" }}
            >
              10:00 AM
            </span>

            {start !== workingStart && (
              <span
                className={`${styles.dynamicLabel} ${styles.aboveBar}`}
                style={{
                  left: `${((start - workingStart) / visibleDuration) * 100}%`,
                }}
              >
                {timeIn}
              </span>
            )}

            <span
              className={`${styles.fixedLabel} ${styles.fixedEnd}`}
              style={
                weekoff === "true" || onLeave === "true" || holiday === "true"
                  ? {
                      left: "100%",
                      transform: "translateX(-100%)",
                    }
                  : {
                      left: `${
                        ((shiftEnd - workingStart) / visibleDuration) * 100
                      }%`,
                      transform: "translateX(-50%)",
                    }
              }
            >
              6:00 PM
            </span>

            <span
              className={`${styles.dynamicExpectedLabel} ${styles.aboveBar}`}
              style={{
                left: `${
                  ((workingEnd - workingStart) / visibleDuration) * 100
                }%`,
              }}
            >
              {expectedTimeOut}
            </span>
            <span
              className={`${styles.dynamicLabel} `}
              style={{
                left: `${((end - workingStart) / visibleDuration) * 100}%`,
              }}
            >
              {timeOut}
            </span>
          </div>
        </div>
      </div>
      <div>
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
          <div>Time-out:  {timeOut}</div>
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
