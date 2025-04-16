import React from "react";
import styles from "./taskcards.module.css";
import Image from "next/image";

const Taskcards = () => {
  const tasks = [
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
    { name: "Client Name", remark: "Remark……!" },
  ];

  return (
    <div className={styles.card}>
      <h2 className={styles.heading}>Upcoming Tasks</h2>
      <div className={styles.taskContainer}>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.taskCard}>
              {/* <Image
                src="/profile.jpg"
                alt="Profile"
                width={40}
                height={40}
                // className={styles.profilePic}
              /> */}
              <div className={styles.taskInfo}>
                <p className={styles.clientName}>{task.name}</p>
                <p className={styles.remark}>{task.remark}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taskcards;
