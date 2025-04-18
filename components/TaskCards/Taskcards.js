import React from "react";
import styles from "./taskcards.module.css";
import Image from "next/image";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import Link from "next/link";

const Taskcards = ({ tasks = [] }) => {
  // const tasks = [
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  //   { name: "Client Name", remark: "Remark……!" },
  // ];

  return (
    <div className={styles.card}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Upcoming Tasks</h2>
        <Link href="/tasks" className={styles.taskViewAllText}>
          <h2 className={styles.heading}>View all</h2>
        </Link>
      </div>
      <div className={styles.taskContainer}>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskCard}>
              <div className={styles.cardCircular}>
                <p className={styles.cardCircularText}>
                  {task?.firstName?.substring(0, 1)}
                </p>
              </div>
              <div className={styles.taskInfo}>
                <p className={styles.clientName}>
                  {task?.lead?.firstName} {task?.lead?.lastName}
                </p>
                <p className={styles.remark}>{task.details}</p>
                <p className={styles.taskDeadline}>
                  Deadline: {dateFormatOnly(task.deadline)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taskcards;
