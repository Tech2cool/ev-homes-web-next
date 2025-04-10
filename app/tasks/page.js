import React from "react";
import styles from "../leads/leads.module.css";
import TaskDashboardCard from "@/components/TasksDashboard/Taskcard";
import TaskList from "@/components/TasksDashboard/Tasklist";
import Taskdetailspage from "@/components/TasksDashboard/Taskdetail";

const TasksPage = () => {
  return (
    <div className={styles.fullContainer}>
      <TaskDashboardCard />
      <div className={styles.listDetailsContainer}>
        <div className={styles.listContainer}>
          <TaskList />
        </div>
        <div className={styles.listHistoryContainer}>
          <Taskdetailspage />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
