import React from "react";
import styles from "./leadlistpage.module.css";

const LeadCard = ({ lead }) => {
  return (
    <div className={styles.leadCard}>
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
        <p><strong>Assign Date:</strong> {lead.assignDate}</p>
        <p><strong>Revisit Deadline:</strong> {lead.visitDeadline}</p>
        <p className={styles.clientStatus}>{lead.clientStatus}</p>
      </div>
    </div>
  );
};

const Leadlistpage = () => {
  const leads = [
    {
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
  ];

  return (
    <div className={styles.leadListContainer}>
      {leads.map((lead, index) => (
        <LeadCard key={index} lead={lead} />
      ))}
    </div>
  );
};

export default Leadlistpage;
