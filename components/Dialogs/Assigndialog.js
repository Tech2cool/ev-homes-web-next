import React, { useEffect, useState } from "react";
import styles from "./assigndialog.module.css";
import { ImCross } from "react-icons/im";

const Assigndialog = ({ onClose }) => {
const [isClosing, setIsClosing] = useState(false);
const handleClose=()=>{
  setIsClosing(true);
};

useEffect(()=>{
  if(isClosing){
    const timeout = setTimeout(()=>{
      onClose();
    },300); 
  }
}, [isClosing,onClose]);

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}><ImCross color="#C41E3A"/></button>
        <h2>Assign Task</h2>
        <div className={styles.formControl}>
          <label htmlFor="select">Subject</label>
          <select name="select" id="select">
            <option value="opt1">First Call</option>
            <option value="opt2">Follow Up</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="text">Remarks</label>
          <textarea name="text" rows="5" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="assignee">Assign To</label>
          <select name="assignee" id="assignee">
            <option value="assignee1">First</option>
            <option value="assignee2">Second</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="deadline">Deadline Date</label>
          <div className={styles.dateInput}>
            <input type="date" id="deadline" name="deadline" />
            <span className={styles.calendarIcon}></span>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.submitButton}>Submit</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Assigndialog;
