import React from "react";
import styles from "./attendancesummarycards.module.css";

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

const Attendancesummarycards = () => {
  return (
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
  );
};

export default Attendancesummarycards;
