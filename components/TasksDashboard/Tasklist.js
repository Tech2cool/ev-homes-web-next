import React from "react";
import styles from "./tasklist.module.css";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskListPage = ({ task, onClick }) => {
  return (
    <div
      className={styles.leadCard}
      onClick={() => {
        onClick(task);
      }}
    >
      <div className={styles.leadInfo}>
        <div className={styles.clientIcon}>
          {task?.lead?.firstName?.charAt(0)?.toUpperCase()}
        </div>
        <div className={styles.clientDetails}>
          <h4>
            {task?.lead?.firstName} {task?.lead?.lastName}
          </h4>
          <p className={styles.phone}>+91 {task?.lead?.phoneNumber}</p>
        </div>
      </div>
      <div className={styles.leadMeta}>
        <p>
          <strong>Details:</strong> {task?.details != "" ? task?.details : "NA"}
        </p>
        <p>
          <strong>Deadline:</strong> {dateFormatOnly(task?.deadline ?? "")}
        </p>
        <p className={styles.taskStatus}>
          {task?.completed == true ? "completed" : "pending"}
        </p>
      </div>
    </div>
  );
};

const TaskList = ({ tasks = [], isLoading, onLeadClick }) => {
  return (
    <div className={styles.taskListContainer}>
      {isLoading
        ? [0, 1, 2, 3, 5].map((ele) => (
            <div
              key={ele}
              style={{
                paddingBottom: 10,
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Skeleton count={1} height={45} width={45} circle />
                  <div
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Skeleton height={15} width={150} />
                    <Skeleton height={15} width={150} />
                  </div>
                </div>
                <div>
                  <Skeleton height={15} width={150} />
                  <Skeleton height={20} width={70} borderRadius={10} />
                </div>
              </SkeletonTheme>
            </div>
          ))
        : tasks.map((lead, index) => (
            <TaskListPage key={index} task={lead} onClick={onLeadClick} />
          ))}
    </div>
  );
};

export default TaskList;
