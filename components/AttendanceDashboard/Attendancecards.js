import React from "react";
import styles from "./attendancecards.module.css";
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarWeek,
  FaUserClock,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const attendanceData = [
  {
    title: "Present",
    count: 28,
    icon: <FaUserCheck />,
    color: "#4CAF50",
  },
  {
    title: "Absent ",
    count: 20,
    icon: <FaUserTimes />,
    color: "#F44336",
  },
  {
    title: "Week Off",
    count: 14,
    icon: <FaCalendarWeek />,
    color: "#FF9800",
  },
  {
    title: "Leave",
    count: 12,
    icon: <FaUserClock />,
    color: "#FFC107",
  },
  { title: "Late Comers", count: 7, icon: <FaSignInAlt />, color: "#03A9F4" },
  {
    title: "Early Leavers",
    count: 9,
    icon: <FaSignOutAlt />,
    color: "#9C27B0",
  },
];

const Attendancecards = () => {
  return (
    <div className={styles.container}>
      {attendanceData.map((item, index) => (
        <div
          key={index}
          className={styles.card}
          style={{ borderColor: item.color }}
        >
          <div className={styles.content}>
            <h4>{item.title}</h4>
            <p>{item.count}</p>
          </div>
          <div className={styles.icon} style={{ color: item.color }}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Attendancecards;