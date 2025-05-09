import React, { useState } from "react";
import styles from "./maintab.module.css";
import { MdBadge } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import AttendanceSection from "./AttendanceSection";
import LeaveSection from "./LeaveSection";

import Personalsection from "./Personalsection";

import WeekOffSection from "./WeekOffSection";
import Regularization from "./Regularizationsection";
import Assets from "./Assetssection";


import ShiftPlannerSection from "./ShiftPlannerSection";
import ReimbursementSection from "./ReimbursementSection";
import ApprovalSection from "../ApprovalSection/ApprovalSection";

import { useRouter } from "next/navigation";


const MainTab = () => {
  const router=useRouter();
  const name = "Shruti Misal";
  const isActive = true;
  const empId = "EV";
  const desg = "App Developer";

  const [selectedTab, setSelectedTab] = useState("Attendance");

  const renderSection = () => {
    switch (selectedTab) {
      case "Personal":
        return <Personalsection />;
      case "Attendance":
        return <AttendanceSection />;
      case "Leave":
        return <LeaveSection />;
      case "Weekoff":
        return <WeekOffSection />;
      case "Regularization":
        return <Regularization />;
      case "Gracetime":
        return <AttendanceSection />;
      case "Reimbursement":
        return <AttendanceSection />;
      case "Assets":
        return <Assets />;
      case "Approval":
        return <ApprovalSection />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.secondContainer}>
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
                className={`${styles.status} ${isActive ? styles.active : styles.inactive
                  }`}
              >
                {isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.empid}>
              <IoPersonCircle size={15} color="#d3af1f" /> Emp Id : {empId}
            </div>
            <div className={styles.desgination}>
              <MdBadge size={15} color="#d3af1f" />
              {desg}
            </div>
          </div>
        </div>
        {/* <div className={styles.insightButton}>
          Attendance Insight
        </div> */}
        <button className={styles.btn} onClick={()=>router.push("./attendance/attendanceinsight")}>
          Attendance Insight
          <svg>
            <defs>
              <filter id="glow">
                <fegaussianblur result="coloredBlur"></fegaussianblur>
                <femerge>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="coloredBlur"></femergenode>
                  <femergenode in="SourceGraphic"></femergenode>
                </femerge>
              </filter>
            </defs>
            <rect />
          </svg>
        </button>
      </div>
      <div className={styles.navbar}>
        <div className={styles.links}>
          <span
            onClick={() => setSelectedTab("Personal")}
            className={selectedTab === "Personal" ? styles.activeTab : ""}
          >
            Personal Information
          </span>
          <span
            onClick={() => setSelectedTab("Attendance")}
            className={selectedTab === "Attendance" ? styles.activeTab : ""}
          >
            Attendance
          </span>
          <span
            onClick={() => setSelectedTab("Leave")}
            className={selectedTab === "Leave" ? styles.activeTab : ""}
          >
            Leave
          </span>
          <span
            onClick={() => setSelectedTab("Weekoff")}
            className={selectedTab === "Weekoff" ? styles.activeTab : ""}
          >
            Week off
          </span>
          <span
            onClick={() => setSelectedTab("Regularization")}
            className={selectedTab === "Regularization" ? styles.activeTab : ""}
          >
            Regularization
          </span>
          <span
            onClick={() => setSelectedTab("Gracetime")}
            className={selectedTab === "Gracetime" ? styles.activeTab : ""}
          >
            Grace Time
          </span>
          <span
            onClick={() => setSelectedTab("Reimbursement")}
            className={selectedTab === "Reimbursement" ? styles.activeTab : ""}
          >
            Reimbursement
          </span>
          <span
            onClick={() => setSelectedTab("Assets")}
            className={selectedTab === "Assets" ? styles.activeTab : ""}
          >
            Assets
          </span>
          <div className={styles.rightAligned}>
            <span
              onClick={() => setSelectedTab("Approval")}
              className={selectedTab === "Approval" ? styles.activeTab : ""}
            >
              Approval Section
            </span>
          </div>
        </div>
      </div>
      <div className={styles.sectionContainer}>{renderSection()}</div>
    </div>
  );
};

export default MainTab;
