import React, { useEffect, useState } from "react";
import styles from "../Dialogs/assigndialog.module.css";
import style from "./sendnotificationdialog.module.css";
import { GrAttachment } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const SendNotificationDialog = ({ onClose }) => {
  const [fileCount, setFileCount] = useState(0);
  const [showEyeContainer, setShowEyeContainer] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
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
        <button className={styles.closeButton} onClick={handleClose}><ImCross color="#C41E3A"/></button>
        <h2>Send Notification</h2>
        <div className={styles.formControl}>
          <label htmlFor="text">Enter Title</label>
          <input name="text" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="text">Type your message here ...</label>
          <textarea name="text" rows="5" />
        </div>

        <div className={styles.formControl}>
          <label className={style.attachLabel}>
            <GrAttachment size={15} color="#121212" /> Attach Files
            <input
              type="file"
              multiple
              className={style.hiddenFileInput}
              onChange={(e) => setFileCount(e.target.files.length)}
            />
          </label>
          <p className={style.fileText}>{fileCount} file(s) selected</p>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="text">Enter Template</label>
          <input name="text" />
        </div>

        <div className={style.buttonContainer}>
          <button className={style.Button}>Send Notification</button>
          <FaEye
            size={30}
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={() => setShowEyeContainer((prev) => !prev)}
          />
        </div>
        {showEyeContainer && (
          <div className={style.eyeContainer}>
            <div className={style.popupBox}>
              <p></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNotificationDialog;
