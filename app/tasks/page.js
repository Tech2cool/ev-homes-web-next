"use client";
import React, { useEffect, useState } from "react";
import styles from "../leads/leads.module.css";
import TaskDashboardCard from "@/components/TasksDashboard/Taskcard";
import TaskList from "@/components/TasksDashboard/Tasklist";
import Taskdetailspage from "@/components/TasksDashboard/Taskdetail";
import { useIsMobile } from "@/hooks/useIsMobile";
const TasksPage = () => {
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const isMobile = useIsMobile();

  const handleLeadClick = (leadId) => {
    setSelectedLeadId(leadId);
  };
  const handleBack = () => {
    setSelectedLeadId(null);
  };

  useEffect(() => {
    if (isMobile === undefined) return;

    if (!isMobile && selectedLeadId === null) {
      setSelectedLeadId("1");
    }
  }, [isMobile, selectedLeadId]);
  return (
    <div className={styles.fullContainer}>
      <TaskDashboardCard />
      
      {isMobile ? (
        selectedLeadId ? (
          <div>
            <button onClick={handleBack}>Back</button>
            <Taskdetailspage leadId={selectedLeadId} />
          </div>
        ) : (
          <TaskList onLeadClick={handleLeadClick} />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <TaskList onLeadClick={handleLeadClick} />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedLeadId ? (
              <Taskdetailspage leadId={selectedLeadId} />
            ) : (
              <p>Select a lead to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
