import React, { useEffect, useState } from "react";
import styles from "../Dialogs/assigndialog.module.css";
import style from "./editleaddetailsdialog.module.css"
import { FaUser } from "react-icons/fa";

const Editleaddetailsdialog = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}></button>
        <h2>Edit Lead Details</h2>

        <div className={styles.sectionHeader}>
          <FaUser className={styles.icon} />
          <span>Personal Information</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="firstName">First Name *</label>
          <div className={style.inputWrapper}>
            <FaUser className={style.inputIcon} />
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className={style.inputField}
            />
          </div>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="lastName">Last Name</label>
          <div className={style.inputWrapper}>
            <FaUser className={style.inputIcon} />
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className={style.inputField}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editleaddetailsdialog;
