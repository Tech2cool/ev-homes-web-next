"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./taskdetail.module.css";
import { FaTasks, FaBell } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useBodyScrollLock from "../useBodyScrollLock";
import Taskhistory from "./Taskhistory";
import Updatestatusdialog from "../Dialogs/Updatestatusdialog";
import Setreminderdialog from "../Dialogs/Setreminderdialog";
import Transfertaskdialog from "../Dialogs/Transfertaskdialog";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import { capitalizeString } from "@/hooks/useString";

const Taskdetailspage = ({ task }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSetReminderDialog, setshowSetReminderDialog] = useState(false);
  const [showTransferTaskDialog, setShowTransferTaskDialog] = useState(false);
  const dropdownRef = useRef(null);

  const isAnyDialogOpen =
    showDialog || showSetReminderDialog || showTransferTaskDialog;
  useBodyScrollLock(isAnyDialogOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTransferTaskClick = () => {
    setShowTransferTaskDialog(true);
  };
  const closeTransferTaskDialog = () => {
    setShowTransferTaskDialog(false);
  };

  const handleUpdateStatusClick = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleSetReminderClick = () => {
    setshowSetReminderDialog(true);
  };
  const closeReminderDialog = () => {
    setshowSetReminderDialog(false);
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.leadHistoryContainer}>
        <div className={styles.detailsContainer}>
          <div className={styles.optionsContainer}>
            <div className={styles.optionsWrapper} ref={dropdownRef}>
              <div
                className={styles.options}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <BsThreeDotsVertical />
              </div>

              {showDropdown && (
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownItem}
                    onClick={handleTransferTaskClick}
                  >
                    Transfer Task
                  </div>
                </div>
              )}
            </div>
          </div>
          {showTransferTaskDialog && (
            <Transfertaskdialog onClose={closeTransferTaskDialog} />
          )}

          <div className={styles.leftSection}>
            <div className={styles.avatar}>
              {task?.lead?.firstName?.charAt(0)?.toUpperCase()}
            </div>
            <div className={styles.name}>
              {task?.lead?.firstName} {task?.lead?.lastName}
            </div>
            <div className={styles.phone}>+91 {task?.lead?.phoneNumber}</div>
          </div>

          <div className={styles.middleSection}>
            <p>
              <span className={styles.label}>Task:</span>{" "}
              <span className={styles.value}>{task?.name}</span>
            </p>
            <p>
              <span className={styles.label}>Description:</span>{" "}
              <span className={styles.value}>
                {task?.details != "" ? task?.details : "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Deadline:</span>{" "}
              <span className={`${styles.value} ${styles.danger}`}>
                {dateFormatOnly(task?.deadline)}
              </span>
            </p>
            <p>
              <span className={styles.label}>Assign To:</span>{" "}
              <span className={styles.value}>
                {task?.assignTo?.firstName} {task?.assignTo?.lastName}
              </span>
            </p>
            <p>
              <span className={styles.label}>Assign By:</span>{" "}
              <span className={styles.value}>
                {" "}
                {task?.assignBy?.firstName} {task?.assignBy?.lastName}
              </span>
            </p>
          </div>

          <div className={styles.rightSection}>
            <p>
              <span className={styles.label}>Email:</span>{" "}
              <span className={styles.value}>
                {task?.lead?.email != "" ? task?.lead?.email : "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Project:</span>{" "}
              <span className={styles.value}>
                {task?.lead?.projects?.length > 0
                  ? task?.lead?.projects?.map((ele) => ele?.name)?.join(", ")
                  : "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Requirement:</span>{" "}
              <span className={styles.value}>
                {task?.lead?.requirement?.length > 0
                  ? task?.lead?.requirement?.join(", ")
                  : "NA"}
              </span>
            </p>
            {task?.lead?.channelPartner ? (
              <p>
                <span className={styles.label}>Channel Partner:</span>{" "}
                <span className={styles.value}>
                  {task?.lead?.channelPartner?.firmName}
                </span>
              </p>
            ) : (
              <></>
            )}
            <p>
              <span className={styles.label}>
                {task?.lead?.cycle != null
                  ? `${capitalizeString(task?.lead?.cycle?.stage ?? "")}`
                  : "Visit"}{" "}
                Deadline:
              </span>{" "}
              <span className={`${styles.value} ${styles.danger}`}>
                {dateFormatOnly(task?.lead?.cycle?.validTill)}
              </span>
            </p>
          </div>
        </div>

        {/* two Buttons  */}
        <div className={styles.buttonColumn}>
          <button
            className={styles.actionButton}
            onClick={handleUpdateStatusClick}
          >
            <FaTasks className={styles.icon} />
            Update Status
          </button>
          {showDialog && <Updatestatusdialog onClose={closeDialog} />}

          <button
            className={styles.actionButton}
            onClick={handleSetReminderClick}
          >
            <FaBell className={styles.icon} />
            Set Reminder
          </button>
          {showSetReminderDialog && (
            <Setreminderdialog onClose={closeReminderDialog} />
          )}
        </div>
        <Taskhistory lead={task?.lead} />
      </div>
    </div>
  );
};

export default Taskdetailspage;
