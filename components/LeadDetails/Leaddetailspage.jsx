"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./leaddetailspage.module.css";
import {
  FaTasks,
  FaBell,
  FaCalendarAlt,
  FaRocket,
  FaRupeeSign,
  FaRegAddressBook,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosAlarm } from "react-icons/io";
import Sendnotificationdialog from "../Dialogs/Sendnotificationdialog";
import Schedulemeetingdialog from "../Dialogs/Schedulemeetingdialog";
import Leadrunningstatusdialog from "../Dialogs/Leadrunningstatusdialog";
import Leadshistory from "../LeadsHistory/Leadshistory";
import { BsThreeDotsVertical } from "react-icons/bs";
import Assigndialog from "../Dialogs/Assigndialog";
import useBodyScrollLock from "../useBodyScrollLock";
import Setreminderdialog from "../Dialogs/Setreminderdialog";
import Editleaddetailsdialog from "../Dialogs/Editleaddetailsdialog";
import { useRouter } from "next/navigation";
import Updatestatusdialog from "../Dialogs/Updatestatusdialog";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import { capitalizeString } from "@/hooks/useString";
import { MdAddCall } from "react-icons/md";
import { useUser } from "@/context/UserContext";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { useData } from "@/context/dataContext";

const Leaddetailspage = ({ lead = null, id = null }) => {
  const { user, getSocket, reconnectSocket, socketInfo } = useUser();
  const { updateLeadById } = useData();
  const socket = getSocket();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeedbackDropdown, setShowFeedbackDropdown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showNotificationDialog, setShowNotificationDialog] = useState(false);
  const [showScheduleMeetingDialog, setShowScheduleMeetingDialog] =
    useState(false);
  const [showLeadRunningStatusDialog, setShowLeadRunningStatusDialog] =
    useState(false);
  const [showEditLeadDetailsDialog, setShowEditLeadDetailsDialog] =
    useState(false);
  const [showAddReminderDialog, setShowAddReminderDialog] = useState(false);
  const [showUpdateStatusDialog, setShowUpdateStatusDialog] = useState(false);

  const router = useRouter();

  const dropdownRef = useRef(null);
  const feedbackRef = useRef(null);

  const isAnyDialogOpen =
    showDialog ||
    showNotificationDialog ||
    showScheduleMeetingDialog ||
    showLeadRunningStatusDialog ||
    showEditLeadDetailsDialog ||
    showAddReminderDialog ||
    showUpdateStatusDialog;
  useBodyScrollLock(isAnyDialogOpen);

  useEffect(() => {
    reconnectSocket();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (feedbackRef.current && !feedbackRef.current.contains(event.target)) {
        setShowFeedbackDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAssignClick = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleNotificationClick = () => {
    setShowNotificationDialog(true);
  };
  const closeNotificationDialog = () => {
    setShowNotificationDialog(false);
  };

  const handleScheduleMeetingClick = () => {
    setShowScheduleMeetingDialog(true);
  };
  const closeScheduleMeeetingDialog = () => {
    setShowScheduleMeetingDialog(false);
  };

  const handleLeadRunningStatusClick = () => {
    setShowLeadRunningStatusDialog(true);
  };
  const closeLeadRunningStatusDialog = () => {
    setShowLeadRunningStatusDialog(false);
  };

  const handleEditLeadDetailsClick = () => {
    setShowEditLeadDetailsDialog(true);
  };
  const closeEditLeadDetailsDialog = () => {
    setShowEditLeadDetailsDialog(false);
    closeUpdateStatusDialog();
  };

  const handleAddReminderDialog = () => {
    setShowAddReminderDialog(true);
  };
  const closeAddReminderDialog = () => {
    setShowAddReminderDialog(false);
  };

  const handleAddFeedbackClick = () => {
    if (lead?.callHistory?.length === 0) {
      handleEditLeadDetailsClick();
    }
    setShowUpdateStatusDialog(true);
  };
  const closeUpdateStatusDialog = () => {
    setShowUpdateStatusDialog(false);
  };

  const onClickSave = (v = {}) => {
    updateLeadById(lead?._id, v);
    setShowEditLeadDetailsDialog(false);
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
                  {/* <div className={styles.dropdownItem}>
                    Status
                    <div className={styles.subMenu}>
                      <div>Visited</div>
                      <div>Revisited</div>
                      <div>Virtual Meeting</div>
                      <div>Booked</div>
                    </div>
                  </div>
                  <div className={styles.dropdownItem}>
                    Generate
                    <div className={styles.subMenu}>
                      <div>Cost Sheet Generator</div>
                      <div>Payment Schedule</div>
                      <div>Demand Letter</div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>

            <div className={styles.optionsWrapper} ref={feedbackRef}>
              {showFeedbackDropdown && (
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownItem}
                    onClick={handleAddFeedbackClick}
                  >
                    Add Feedback
                  </div>
                </div>
              )}
            </div>
          </div>
          {showUpdateStatusDialog && (
            <>
              {/* <Updatestatusdialog
                onClose={closeUpdateStatusDialog}
                lead={lead}
                task={lead?.taskRef}
              /> */}
              <Updatestatusdialog
                onClose={closeUpdateStatusDialog}
                lead={lead}
                task={lead?.taskRef}
              />
            </>
          )}

          {showEditLeadDetailsDialog && (
            <Editleaddetailsdialog
              onClose={closeEditLeadDetailsDialog}
              lead={lead}
              onClickSave={onClickSave}
            />
          )}

          <div className={styles.leftSection}>
            <div className={styles.avatar}>
              {lead?.firstName?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className={styles.name}>
              {lead?.firstName ?? ""} {lead?.lastName ?? ""}
            </div>
            <div className={styles.phone}>
              {lead?.countryCode ?? "91"} {lead?.phoneNumber}
            </div>
            <div style={{ display: "flex", marginTop: 10 }}>
              <MdAddCall
                size={25}
                color="dodgerblue"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("clicked 1");
                  console.log(socket);
                  socket?.emit("callCustomerWeb", {
                    lead: lead?._id,
                    phoneNumber: `${lead?.countryCode}${lead?.phoneNumber}`,
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
                  console.log("clicked 1");

                  socket?.emit("callCustomerWeb", {
                    lead: lead?._id,
                    phoneNumber: `${lead?.countryCode}${lead?.phoneNumber}`,
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
              <span className={styles.label}>Requirement:</span>{" "}
              <span className={styles.value}>
                {lead?.requirement?.join(", ") ?? "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Channel Partner:</span>{" "}
              <span className={styles.value}>
                {lead?.channelPartner?.firmName ?? "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Project:</span>{" "}
              <span className={styles.value}>
                {" "}
                {lead?.project.map((ele) => ele?.name ?? "")?.join(", ") ??
                  "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Status:</span>{" "}
              {/* TODO: status logic  */}
              <span className={styles.value}>{lead?.stage}</span>
            </p>
            <p>
              <span className={styles.label}>
                {" "}
                {lead?.cycle != null
                  ? `${capitalizeString(lead?.cycle?.stage ?? "")}`
                  : "Visit"}{" "}
                Deadline:
              </span>{" "}
              <span className={`${styles.value} ${styles.danger}`}>
                {dateFormatOnly(lead?.cycle?.validTill)}
              </span>
            </p>
            <p>
              <span className={styles.label}>Site Visit Interested:</span>{" "}
              <span className={`${styles.value} ${styles.danger}`}>
                {lead?.siteVisitInterested ? "YES" : "NO"}
              </span>
            </p>
          </div>

          <div className={styles.rightSection}>
            <p>
              <span className={styles.label}>Email:</span>{" "}
              <span className={styles.value}>
                {lead?.email && lead?.email != "" ? lead?.email : "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Address:</span>{" "}
              <span className={styles.value}>{lead?.address ?? "NA"}</span>
            </p>
            <p>
              <span className={styles.label}>Assigned To:</span>{" "}
              <span className={styles.value}>
                {lead?.taskRef
                  ? `${lead?.taskRef?.assignTo?.firstName ?? ""} ${
                      lead?.taskRef?.assignTo?.lastName ?? ""
                    }`
                  : "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Client Status:</span>{" "}
              <span className={styles.value}>
                {lead?.clientInterestedStatus ?? "NA"}
              </span>
            </p>
            <p>
              <span className={styles.label}>Lead Status:</span>{" "}
              <span className={`${styles.value} ${styles.cold}`}>
                {lead?.interestedStatus ?? "NA"}
              </span>
            </p>
          </div>
        </div>
        {/*  Buttons  */}
        <div className={styles.buttonColumn}>
          <button
            className={styles.actionButton}
            onClick={handleAddFeedbackClick}
          >
            <FaTasks className={styles.icon} />
            Add Feedback
          </button>

          {/* <button className={styles.actionButton} onClick={handleAssignClick}>
            <FaTasks className={styles.icon} />
            Assign Task
          </button> */}
          {showDialog && <Assigndialog onClose={closeDialog} />}

          {/* <button
            className={styles.actionButton}
            onClick={handleNotificationClick}
          >
            <FaBell className={styles.icon} />
            Send Notification
          </button> */}
          {showNotificationDialog && (
            <Sendnotificationdialog onClose={closeNotificationDialog} />
          )}

          <button
            className={styles.actionButton}
            onClick={handleScheduleMeetingClick}
          >
            <FaCalendarAlt className={styles.icon} />
            Schedule Meeting
          </button>
          {showScheduleMeetingDialog && (
            <Schedulemeetingdialog onClose={closeScheduleMeeetingDialog} />
          )}

          <button
            className={styles.actionButton}
            onClick={handleLeadRunningStatusClick}
          >
            <FaRocket className={styles.icon} />
            Lead Running Status
          </button>
          {showLeadRunningStatusDialog && (
            <Leadrunningstatusdialog onClose={closeLeadRunningStatusDialog} />
          )}

          <button
            className={styles.actionButton}
            onClick={() => router.push("./leads/estimate-generator")}
          >
            <FaRupeeSign className={styles.icon} />
            Estimate Generator
          </button>

          {/* <button
            className={styles.actionButton}
            onClick={handleAddReminderDialog}
          >
            <IoIosAlarm className={styles.icon} />
            Add Reminder
          </button> */}
          {showAddReminderDialog && (
            <Setreminderdialog onClose={closeAddReminderDialog} />
          )}
        </div>
        <Leadshistory lead={lead} />
      </div>
    </div>
  );
};

export default Leaddetailspage;
