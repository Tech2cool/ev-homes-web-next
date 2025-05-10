import React, { useState ,useRef } from "react";
import styles from "./leavesection.module.css";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { LuAlarmClock } from "react-icons/lu";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import { FaCalendarCheck, FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import LeaveForm from "./Forms/LeaveForm";
import { useClickOutside } from "../useClickOutside";

const initialLeaveData = [
  {
    apply: "25 April 2025",
    startdate: "28 April 2025",
    enddate: "29 April 2025",
    totalDays: "2",
    leaveType: "Casual Leave",
    reason: "Personal reason..",
    status: "Pending",
    attachment: "",
  },
  {
    apply: "12 March 2025",
    startdate: "15 March 2025",
    enddate: "20 March 2025",
    totalDays: "6",
    leaveType: "Comp Leave",
    reason: "Internal exam...",
    status: "Approved",
    attachment: "",
  },
  {
    apply: "02 Feb 2025",
    startdate: "05 Feb 2025",
    enddate: "10 Feb 2025",
    totalDays: "6",
    leaveType: "Paid Leave",
    reason: "For personal...",
    status: "Rejected",
    attachment: "",
  },
  {
    apply: "02 Feb 2025",
    startdate: "05 Feb 2025",
    enddate: "10 Feb 2025",
    totalDays: "6",
    leaveType: "Paid Leave",
    reason: "For personal...",
    status: "Rejected",
    attachment: "",
  },
];

export default function LeaveSection() {
    const modalRef = useRef(null);
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

   useClickOutside({
      refs: [modalRef],
      handler: () => setIsModalOpen(false),
      active: isModalOpen,
    });

  const filteredData =
    filter == "All"
      ? leaveData
      : leaveData.filter((leave) => leave.status === filter);

  const getTotalDays = (type) =>
    leaveData
      .filter((l) => l.leaveType === type)
      .reduce((sum, l) => sum + parseInt(l.totalDays, 10), 0);

  const casualCount = getTotalDays("Casual Leave");
  const compCount = getTotalDays("Comp Leave");
  const paidCount = getTotalDays("Paid Leave");

  const totalDaysAll = casualCount + compCount + paidCount;

  const casualPercent = totalDaysAll ? (casualCount / totalDaysAll) * 100 : 0;
  const compPercent = totalDaysAll ? (compCount / totalDaysAll) * 100 : 0;
  const paidPercent = totalDaysAll ? (paidCount / totalDaysAll) * 100 : 0;

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{leaveData.length}</div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Approved")}
            >
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {leaveData.filter((l) => l.status === "Approved").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Rejected")}
            >
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {leaveData.filter((l) => l.status === "Rejected").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Pending")}
            >
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {leaveData.filter((l) => l.status === "Pending").length}
              </div>
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.leaveHeadline}>
              <LuAlarmClock /> Your Leave
            </div>
            <div className={styles.progressGroup}>
              <div className={styles.labelColumn}>
                <span>Casual Leave</span>
                <span>Comp Off</span>
                <span>Paid Leave</span>
              </div>
              <div className={styles.barColumn}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFillCL}
                    style={{ width: `${casualPercent}%` }}
                  />
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFillCO}
                    style={{ width: `${compPercent}%` }}
                  />
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFillPL}
                    style={{ width: `${paidPercent}%` }}
                  />
                </div>
              </div>
              <div className={styles.countColumn}>
                <span>{casualCount.toString().padStart(2, "0")}</span>
                <span>{compCount.toString().padStart(2, "0")}</span>
                <span>{paidCount.toString().padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div
              className={styles.applyButton}
              onClick={() => setIsModalOpen(true)}
            >
              <FaPersonWalkingLuggage className={styles.applyIcon} /> Apply
              Leave
            </div>
          </div>
          <table className={styles.leaveTable}>
            <thead>
              <tr>
                <th>
                  <FaBagShopping /> Applied On
                </th>
                <th>
                  <FaCalendarDay /> Start Date & End Date
                </th>
                <th>
                  <FaCalendarCheck /> Total days
                </th>
                <th>
                  <PiAirplaneTakeoffFill /> Leave Type
                </th>
                <th>
                  <MdOutlineFeedback /> Reason
                </th>
                <th>
                  <FaFileUpload /> Attachment
                </th>
                <th>
                  <MdOutlineCallToAction /> Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.apply}</td>
                  <td>
                    {leave.startdate} to {leave.enddate}
                  </td>
                  <td>{leave.totalDays}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.reason}</td>
                  <td>
                    {leave.attachment ? (
                      <a
                        href={leave.attachment}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        leave.status === "Approved"
                          ? styles.statusApproved
                          : leave.status === "Rejected"
                          ? styles.statusRejected
                          : styles.statusPending
                      }
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
              <LeaveForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
