import React, { useEffect, useState } from 'react';
import styles from "../Dialogs/assigndialog.module.css";
import { ImCross } from "react-icons/im";

const Leadrunningstatusdialog = ({onClose}) => {
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
            <h2>Lead Running Status</h2>
          </div>
        </div>
      );
};

export default Leadrunningstatusdialog