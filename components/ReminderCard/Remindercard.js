import React from "react";
import styles from "./remindercard.module.css";
import { dateFormatWithTime } from "@/hooks/useDateFormat";

const Remindercard = ({ reminders = [] }) => {
  return (
    <div className={styles.reminderCard}>
      <h3 className={styles.title}>Reminders</h3>
      <ul className={styles.reminderList}>
        {reminders?.length === 0 ? (
          <>
            <p>No Reminders</p>
          </>
        ) : (
          reminders?.slice(0, 3)?.map((ele, i) => (
            <li key={ele?._id ?? i}>
              <p style={{ fontSize: 12 }}>
                {ele?.lead?.firstName} {ele?.lead?.lastName}
              </p>

              <p
                style={{ fontSize: 11, fontWeight: "600", color: "#ffffff9e" }}
              >
                {dateFormatWithTime(ele?.reminderDate ?? "")}
              </p>
              <p style={{ fontSize: 13 }}>{ele?.reminderDescription}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Remindercard;
