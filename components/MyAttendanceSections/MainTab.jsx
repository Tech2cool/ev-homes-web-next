import React from "react";
import styles from "./maintab.module.css";
import { MdBadge } from "react-icons/md";

const MainTab = () => {
  const name = "Shruti Misal";
  const isActive = true;
  const empId = "EV233";
  const desg = "App Developer";

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.container}>
        <div className={styles.profileSection}>
          <img
            src="/path/to/profile.jpg"
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.details}>
            <div className={styles.name}>{name}</div>
            <div
              className={`${styles.status} ${
                isActive ? styles.active : styles.inactive
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.empid}>Emp Id : {empId}</div>
          <div className={styles.desgination}>
            <MdBadge />
            {desg}
          </div>
        </div>
      </div>
      <div className={styles.navbar}>
        <div className={styles.links}>
          <span>Personal Information</span>
          <span>Attendance</span>
          <span>Leave</span>
          <span>Week off</span>
          <span>Regularization</span>
          <span>Grace Time</span>
          <span>Reimbursement</span>
          <span>Assets</span>
        </div>
      </div>
    </div>
  );
};

export default MainTab;
