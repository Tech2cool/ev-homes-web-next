import React from "react";
import styles from "./taskhistory.module.css";
import { FaCheck } from "react-icons/fa";
import { dateFormatWithTime } from "@/hooks/useDateFormat";

const Taskhistory = ({ lead = null }) => {
  const followups = lead?.callHistory ?? [];
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
                <div className={styles.name}>
                  {" "}
                  {item?.caller?.firstName ?? ""} {item?.caller?.lastName ?? ""}
                </div>
                <div className={styles.subtext}>
                  {item?.remark ?? ""} -{" "}
                  {item?.interestedStatus?.replace("-", " ")}
                </div>
                <div className={styles.subtext}>{item.feedback}</div>
                <div className={styles.date}>
                  {dateFormatWithTime(item.callDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/*

    <div className={styles.followUpHistoryContainer}>
      <h2 className={styles.heading2}>Follow Up History</h2>
      <div className={styles.container}>
        <div className={styles.timelineRight}>
          {followups.map((item, index) => (
            <div className={styles.timelineRightItem} key={index}>
              <div className={styles.timelineDotRight}>
                <FaCheck size={10} color="black" />
              </div>
              <div className={styles.timelineCardRight}>
                <div className={styles.name}>
                  {" "}
                  {item?.caller?.firstName ?? ""} {item?.caller?.lastName ?? ""}
                </div>
                <div className={styles.subtext}>
                  {item?.remark ?? ""} -{" "}
                  {item?.interestedStatus?.replace("-", " ")}
                </div>
                <div className={styles.subtext}>{item.feedback}</div>
                <div className={styles.date}>
                  {dateFormatWithTime(item.callDate)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


*/

export default Taskhistory;
