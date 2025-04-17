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

const Leaddetailspage = ({ lead = null, id = null }) => {
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
  };

  const handleAddReminderDialog = () => {
    setShowAddReminderDialog(true);
  };
  const closeAddReminderDialog = () => {
    setShowAddReminderDialog(false);
  };

  const handleUpdateStatusClick = () => {
    setShowUpdateStatusDialog(true);
  };
  const closeUpdateStatusDialog = () => {
    setShowUpdateStatusDialog(false);
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
                  <div className={styles.dropdownItem}>
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
                  </div>
                </div>
              )}
            </div>

            <div className={styles.optionsWrapper} ref={feedbackRef}>
              <div
                className={styles.optionsFeedback}
                onClick={() => setShowFeedbackDropdown(!showFeedbackDropdown)}
              >
                <span style={{ fontSize: "20px", fontWeight: "normal" }}>
                  +
                </span>
              </div>

              {showFeedbackDropdown && (
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownItem}
                    onClick={handleUpdateStatusClick}
                  >
                    Add Feedback
                  </div>
                </div>
              )}
            </div>
          </div>
          {showEditLeadDetailsDialog && (
            <Editleaddetailsdialog onClose={closeEditLeadDetailsDialog} />
          )}
          {showUpdateStatusDialog && (
            <Updatestatusdialog onClose={closeUpdateStatusDialog} />
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
              <span className={styles.label}>Visit Deadline:</span>{" "}
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
          <button className={styles.actionButton} onClick={handleAssignClick}>
            <FaTasks className={styles.icon} />
            Assign Task
          </button>
          {showDialog && <Assigndialog onClose={closeDialog} />}

          <button
            className={styles.actionButton}
            onClick={handleNotificationClick}
          >
            <FaBell className={styles.icon} />
            Send Notification
          </button>
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

          <button
            className={styles.actionButton}
            onClick={handleAddReminderDialog}
          >
            <IoIosAlarm className={styles.icon} />
            Add Reminder
          </button>
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
