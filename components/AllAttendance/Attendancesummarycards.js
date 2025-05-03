import React from "react";
import styles from "./attendancesummarycards.module.css";
import {
  FaUserCheck, FaUserTimes, FaCalendarWeek, FaUserClock,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { icons } from "lucide-react";



const data = [
  {
    title: "Present Summary",
    items: [
      { label: "Present", value: 26 },
      { label: "Late Comers", value: 2 },
      { label: "Early Leavers", value: 4 },
    ],
  },
  {
    title: "Absent Summary",
    items: [
      { label: "Absent", value: 42 },
      { label: "Leave", value: 36 },
    ],
  },
  {
    title: "Day Off Summary",
    items: [{ label: "Week off", value: 0 }],
  },
];
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
];
const attendanceDataLeave = [
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

const Attendancesummarycards = () => {
  return (
    <div>
      <div className={styles.container}>
        {data.map((section, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.title}>{section.title}</div>
            <div className={styles.itemsRow}>
              {section.items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className={styles.itemBox}>
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.value}>{item.value}</div>
                  </div>
                  {idx < section.items.length - 1 && (
                    <div className={styles.divider}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}

      </div>
      {/* display only mobile */}

      <div className={styles.nocontainer}>
        {attendanceData.map((item, index) => (
          <div
            key={index}
            className={styles.nocard}
            style={{ borderColor: item.color }}
          >
            <div className={styles.data}>
              <div className={styles.content}>

                <p>{item.count}</p>
                <div className={styles.icon} style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
              <div className={styles.item} >
                <p>{item.title}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className={styles.nocontainer}>
        {attendanceDataLeave.map((item, index) => (
          <div
            key={index}
            className={styles.nocard}
            style={{ borderColor: item.color }}
          >
            <div className={styles.data}>
              <div className={styles.content}>

                <p>{item.count}</p>
                <div className={styles.icon} style={{ color: item.color }}>
                  {item.icon}
                </div>
              </div>
              <div className={styles.item} >
                <p>{item.title}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>



  );
};

export default Attendancesummarycards;
