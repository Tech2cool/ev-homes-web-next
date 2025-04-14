import React from "react";
import styles from "./leadlistpage.module.css";

const LeadCard = ({ lead , onClick}) => {
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
        <p><strong>Assign Date:</strong> {lead.assignDate}</p>
        <p><strong>Revisit Deadline:</strong> {lead.visitDeadline}</p>
        <p className={styles.clientStatus}>{lead.clientStatus}</p>
      </div>
    </div>
  );
};

const Leadlistpage = ({onLeadClick}) => {
  const leads = [
    {id:"1",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {id:"2",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {id:"3",
      clientName: "Dummy Dummy",
      clientPhone: "123456789",
      assignDate: "04-04-004",
      visitDeadline: "04-04-004",
      clientStatus: "Visit Pending",
    },
    {id:"4",
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
        <LeadCard key={index} lead={lead} onClick={onLeadClick}/>
      ))}
    </div>
  );
};

export default Leadlistpage;
