"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./taskdetail.module.css";
import { FaTasks, FaBell, FaWhatsapp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import useBodyScrollLock from "../useBodyScrollLock";
import Taskhistory from "./Taskhistory";
import Updatestatusdialog from "../Dialogs/Updatestatusdialog";
import Setreminderdialog from "../Dialogs/Setreminderdialog";
import Transfertaskdialog from "../Dialogs/Transfertaskdialog";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import { capitalizeString } from "@/hooks/useString";
import { MdAddCall } from "react-icons/md";
import { useUser } from "@/context/UserContext";
import { PiPlugsConnectedFill } from "react-icons/pi";
import Editleaddetailsdialog from "../Dialogs/Editleaddetailsdialog";
import { useData } from "@/context/dataContext";

const Taskdetailspage = ({ task }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSetReminderDialog, setshowSetReminderDialog] = useState(false);
  const [showTransferTaskDialog, setShowTransferTaskDialog] = useState(false);
  const [showEditLeadDetailsDialog, setShowEditLeadDetailsDialog] =
    useState(false);

  const dropdownRef = useRef(null);
  const { user, getSocket, socketInfo } = useUser();
  const { updateLeadById, getTaskById } = useData();

  const socket = getSocket(); // always latest

  const isAnyDialogOpen =
    showDialog ||
    showSetReminderDialog ||
    showEditLeadDetailsDialog ||
    showTransferTaskDialog;
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
  const handleEditLeadDetailsClick = () => {
    setShowEditLeadDetailsDialog(true);
  };
  const closeEditLeadDetailsDialog = () => {
    setShowEditLeadDetailsDialog(false);
    closeDialog();
  };
  const onClickSave = async (v = {}) => {
    await updateLeadById(task?.lead?._id, v);
    await getTaskById(task?._id);
    setShowEditLeadDetailsDialog(false);
  };

  const handleTransferTaskClick = () => {
    setShowTransferTaskDialog(true);
  };
  const closeTransferTaskDialog = () => {
    setShowTransferTaskDialog(false);
  };

  const handleUpdateStatusClick = () => {
    if (task?.lead?.callHistory?.length === 0) {
      handleEditLeadDetailsClick();
    }
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
                    onClick={handleEditLeadDetailsClick}
                  >
                    Edit
                  </div>

                  {/* <div
                    className={styles.dropdownItem}
                    onClick={handleTransferTaskClick}
                  >
                    Transfer Task
                  </div> */}
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
            <div style={{ display: "flex", marginTop: 10 }}>
              <MdAddCall
                size={25}
                color="dodgerblue"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked 1");
                  console.log(socket);
                  socket?.emit("callCustomerWeb", {
                    lead: task?.lead?._id,
                    phoneNumber: `${task?.lead?.countryCode}${task?.lead?.phoneNumber}`,
                    type: "call",
                    message: "call",
                    userId: user?._id,
                  });
                  console.log("clicked 2");
                }}
              />
              <div style={{ marginRight: 10 }} />
              <FaWhatsapp
                size={25}
                color="green"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!socketInfo?.phoneSocketId) {
                    alert("App is not connected");
                    return;
                  }
                  console.log("clicked 1");

                  socket?.emit("callCustomerWeb", {
                    lead: task?.lead?._id,
                    phoneNumber: `${task?.lead?.countryCode}${task?.lead?.phoneNumber}`,
                    type: "whatsapp",
                    message: "hey",
                    userId: user?._id,
                  });
                  console.log("clicked 2");
                }}
              />
            </div>
            <div
              style={{ marginTop: 5, display: "flex", alignItems: "center" }}
            >
              <PiPlugsConnectedFill
                color={socketInfo?.phoneSocketId ? "green" : "red"}
              />
              <div style={{ marginRight: 5 }} />
              <p
                style={{
                  fontSize: 12,
                  color: socketInfo?.phoneSocketId ? "green" : "red",
                }}
              >
                {socketInfo?.phoneSocketId ? "Connected" : "Not Connected"}
              </p>
            </div>
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
            Add Feedback
          </button>
          {showDialog && (
            <Updatestatusdialog
              task={task}
              lead={task?.lead}
              onClose={closeDialog}
            />
          )}
          {showEditLeadDetailsDialog && (
            <Editleaddetailsdialog
              onClose={closeEditLeadDetailsDialog}
              lead={task?.lead}
              onClickSave={onClickSave}
            />
          )}

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
