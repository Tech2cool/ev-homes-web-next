import React from "react";
import styles from "./taskhistory.module.css";
import { FaCheck } from "react-icons/fa";

const Taskhistory = () => {
  const followups = [
    {
      name: "Dummy",
      status: "NotReceived",
      feedback: "Done",
      date: "7 April 2025",
    },
    {
      name: "Dummy",
      status: "NotReceived",
      feedback: "Done",
      date: "7 April 2025",
    },
    {
      name: "Dummy",
      status: "NotReceived",
      feedback: "Done",
      date: "7 April 2025",
    },
  ];

  return (
    <div>
      <h2 className={styles.heading}>Follow Up History</h2>
      <div className={styles.container}>
        <div className={styles.timeline}>
          {followups.map((item, index) => (
            <div className={styles.timelineItem} key={index}>
              <div className={styles.timelineDot}>
                <FaCheck size={10} color="#121212" />
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.subtext}>{item.status}</div>
                <div className={styles.subtext}>{item.feedback}</div>
                <div className={styles.date}>{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taskhistory;
