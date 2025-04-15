import React from "react";
import styles from "./tasklist.module.css";

const TaskListPage = ({ lead ,onClick}) => {
  return (
    <div className={styles.leadCard} onClick={()=>{onClick(lead.id)}}>
      <div className={styles.leadInfo}>
        <div className={styles.clientIcon}>
          {lead.clientName.charAt(0).toUpperCase()}
        </div>
        <div className={styles.clientDetails}>
          <h4>{lead.clientName}</h4>
          <p className={styles.phone}>{lead.clientPhone}</p>
        </div>
      </div>
      <div className={styles.leadMeta}>
        <p><strong>Task:</strong> {lead.task}</p>
        <p><strong>Deadline:</strong> {lead.deadline}</p>
        <p className={styles.taskStatus}>{lead.taskStatus}</p>
      </div>
    </div>
  );
};

const TaskList = ({onLeadClick}) => {
  const leads = [
    {id:"1",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      task: "followup",
      deadline: "04-04-004",
      taskStatus: "Completed",
    },
    {id:"1",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      task: "followup",
      deadline: "04-04-004",
      taskStatus: "Completed",
    },
    {id:"1",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      task: "followup",
      deadline: "04-04-004",
      taskStatus: "Completed",
    },
    {id:"1",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      task: "followup",
      deadline: "04-04-004",
      taskStatus: "Completed",
    },
  ];

  return (
    <div className={styles.taskListContainer}>
      {leads.map((lead, index) => (
        <TaskListPage key={index} lead={lead} onClick={onLeadClick}/>
      ))}
    </div>
  );
};

export default TaskList;
