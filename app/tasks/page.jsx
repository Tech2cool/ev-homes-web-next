"use client";
import React, { useEffect, useMemo, useState } from "react";
import styles from "../leads/leads.module.css";
import TaskDashboardCard from "@/components/TasksDashboard/Taskcard";
import TaskList from "@/components/TasksDashboard/Tasklist";
import Taskdetailspage from "@/components/TasksDashboard/Taskdetail";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useData } from "@/context/dataContext";
import { useUser } from "@/context/UserContext";

const TasksPage = () => {
  const { user, loading } = useUser();

  const {
    tasks,
    currentTask,
    fetchSaleExecutiveTasks,
    updateCurrentTask,
    loadingTask,
  } = useData();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(null);

  const isMobile = useIsMobile();

  const onChangeSearch = (e) => {
    setQuery(e.target.value);
  };

  const onChangeFilter = (value) => {
    setFilter(value);
  };

  const handleLeadClick = (lead) => {
    updateCurrentTask(lead);
  };

  const handleBack = () => {
    // setSelectedLeadId(null);
    updateCurrentTask(null);
  };

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect tasks");
      fetchSaleExecutiveTasks(user?._id);
    }
    // if (isMobile === undefined) return;

    // if (!isMobile && selectedLeadId === null) {
    //   setSelectedLeadId("1");
    // }
  }, [isMobile]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const name = `${task?.lead?.firstName?.toLowerCase()} ${task?.lead?.lastName?.toLowerCase()}`;
      const phone = `${task?.lead?.phoneNumber?.toString()?.toLowerCase()}`;
      if (filter) {
        if (filter?.toLowerCase() === "pending") {
          if (
            task?.completed === false &&
            (name?.includes(query?.toLowerCase()) ||
              phone?.includes(query?.toLowerCase()))
          ) {
            return true;
          }
        } else if (filter?.toLowerCase() === "completed") {
          if (
            task?.completed === true &&
            (name?.includes(query?.toLowerCase()) ||
              phone?.includes(query?.toLowerCase()))
          ) {
            return true;
          }
        } else if (filter?.toLowerCase() === "all") {
          if (
            name?.includes(query?.toLowerCase()) ||
            phone?.includes(query?.toLowerCase())
          ) {
            return true;
          }
        } else if (
          filter?.toLowerCase() === "first-call" ||
          filter?.toLowerCase() === "followup"
        ) {
          if (
            (task?.type === filter && name?.includes(query?.toLowerCase())) ||
            phone?.includes(query?.toLowerCase())
          ) {
            return true;
          }
        }
      } else {
        if (
          name?.includes(query?.toLowerCase()) ||
          phone?.includes(query?.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  }, [tasks, query, filter]);

  return (
    <div className={styles.fullContainer}>
      {!(isMobile && currentTask) && (
        <TaskDashboardCard
          value={query}
          filter={filter}
          onChangeSearch={onChangeSearch}
          onChangeFilter={onChangeFilter}
        />
      )}
      {isMobile ? (
        currentTask ? (
          <div>
            <div className={styles.backButtonWrapper}>
              <IoArrowBackCircleOutline
                size={20}
                onClick={handleBack}
                className={styles.backIcon}
              />
            </div>
            <Taskdetailspage task={currentTask} />
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            isLoading={loadingTask}
            onLeadClick={handleLeadClick}
          />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <TaskList
              tasks={filteredTasks}
              isLoading={loadingTask}
              onLeadClick={handleLeadClick}
            />
          </div>
          <div className={styles.listHistoryContainer}>
            {currentTask ? (
              <Taskdetailspage task={currentTask} />
            ) : (
              <div className={styles.messageWrapper}>
                <p>Select a Task to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
