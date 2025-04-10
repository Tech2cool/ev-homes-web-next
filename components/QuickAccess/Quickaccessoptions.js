"use client";
import React, { useState } from "react";
import styles from "./quickaccessoptions.module.css";

const Quickaccessoptions = () => {
  const [applyOpen, setApplyOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);

  const toggleApply = () => {
    setApplyOpen(!applyOpen);
    setApprovalOpen(false); 
  };

  const toggleApproval = () => {
    setApprovalOpen(!approvalOpen);
    setApplyOpen(false); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.dropdown} onClick={toggleApply}>
        <button className={styles.dropdownButton}>Apply</button>
        {applyOpen && (
          <div className={styles.dropdownMenu}>
            <p>Leave</p>
            <p>Attendance</p>
            <p>Reimbursement</p>
            <p>Assets</p>
          </div>
        )}
      </div>

      <div className={styles.dropdown} onClick={toggleApproval}>
        <button className={styles.dropdownButton}>Approval</button>
        {approvalOpen && (
          <div className={styles.dropdownMenu}>
            <p>Leave</p>
            <p>Attendance</p>
            <p>Reimbursement</p>
            <p>Assets</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quickaccessoptions;
