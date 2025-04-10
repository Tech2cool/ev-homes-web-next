import React from "react";
import styles from "./leadshistory.module.css";
import { FaCheck } from "react-icons/fa";

const Leadshistory = () => {
  const transfers = [
    {
      name: "Dummy",
      from: "",
      startDate: "7 April 2025",
      endDate: "7 April 2025",
    },
    {
      name: "Dummy",
      from: "",
      startDate: "7 April 2025",
      endDate: "7 April 2025",
    },
    {
      name: "Dummy",
      from: "",
      startDate: "7 April 2025",
      endDate: "7 April 2025",
    },
    {
      name: "Dummy",
      from: "",
      startDate: "7 April 2025",
      endDate: "7 April 2025",
    },
  ];

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
    <div className={styles.twoContainers}>
      <div>
        <h2 className={styles.heading}>Lead Transfer History</h2>
        <div className={styles.container}>
          <div className={styles.timeline}>
            {transfers.map((item, index) => (
              <div className={styles.timelineItem} key={index}>
                <div className={styles.timelineDot}> <FaCheck size={10} color="#121212" /></div>
                <div className={styles.timelineCard}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.subtext}>Transferred from</div>
                  <div className={styles.date}>
                    {item.startDate} - {item.endDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.heading2}>Follow Up History</h2>
        <div className={styles.container}>
          <div className={styles.timelineRight}>
            {followups.map((item, index) => (
              <div className={styles.timelineRightItem} key={index}>
                <div className={styles.timelineDotRight}><FaCheck size={10} color="#121212" /></div>
                <div className={styles.timelineCardRight}>
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
    </div>
  );
};

export default Leadshistory;
