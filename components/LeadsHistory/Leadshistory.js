import React from "react";
import styles from "./leadshistory.module.css";
import { FaCheck } from "react-icons/fa";
import { dateFormatOnly, dateFormatWithTime } from "@/hooks/useDateFormat";

const Leadshistory = ({ lead = null }) => {
  const transfers = lead?.cycleHistory ?? []; /*[
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
  ];*/

  const followups = lead?.callHistory ?? []; /*[
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
  ];*/
  return (
    <div className={styles.twoContainers}>
      <div className={styles.leadHistoryContainer}>
        <h2 className={styles.heading}>Lead Transfer History</h2>
        <div className={styles.container}>
          <div className={styles.timeline}>
            {transfers.map((item, index) => (
              <div className={styles.timelineItem} key={index}>
                <div className={styles.timelineDot}>
                  {" "}
                  <FaCheck size={10} color="black" />
                </div>
                <div className={styles.timelineDot}>
                  {" "}
                  <FaCheck size={10} color="#121212" />
                </div>
                <div className={styles.timelineCard}>
                  <div className={styles.subtext}>Transferred from</div>
                  <div className={styles.name}>
                    {item?.teamLeader?.firstName ?? ""}{" "}
                    {item?.teamLeader?.lastName ?? ""}
                  </div>
                  <div className={styles.date}>
                    {dateFormatOnly(item.startDate)} -{" "}
                    {dateFormatOnly(item.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
                    {item?.caller?.firstName ?? ""}{" "}
                    {item?.caller?.lastName ?? ""}
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
    </div>
  );
};

export default Leadshistory;
