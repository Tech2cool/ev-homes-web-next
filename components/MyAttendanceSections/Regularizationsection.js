import React, { useState } from "react";
import styles from "./leavesection.module.css";
import { MdOutlineFeedback, MdOutlineCallToAction, MdLockClock } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
import { FaCalendarCheck, FaCalendarDay, FaClock, FaTypo3 } from "react-icons/fa";
import RegularizationFrom from "./Forms/RegularizationForm";

const RegularizeData = [
  {
    apply: "25 April 2025",
    regularizaDate:"6 April 2025",
    checkIn: "NA",
    checkOut: "NA",
    type:"WeekOff",
    reason:"for get to apply weekoff",
    status: "Pending",
  },
  {
    apply: "25 April 2025",
    regularizaDate:"6 April 2025",
    checkIn: "NA",
    checkOut: "NA",
    type:"WeekOff",
    reason:"for get to apply weekoff",
    status: "Approved",
  },
  {
    apply: "25 April 2025",
    regularizaDate:"6 April 2025",
    checkIn: "NA",
    checkOut: "NA",
    type:"WeekOff",
    reason:"for get to apply weekoff",
    status: "Rejected",
  },
  {
    apply: "25 April 2025",
    regularizaDate:"6 April 2025",
    checkIn: "NA",
    checkOut: "NA",
    type:"WeekOff",
    reason:"for get to apply weekoff",
    status: "Rejected",
  },
];

const Regularization = () => {
    const [Regularize, setRegularizeData] = useState(RegularizeData);
    const [filter, setFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const filteredData =
      filter == "All"
        ? Regularize
        : Regularize.filter((leave) => leave.status === filter);
  
   
  
    return (
      <div className={styles.maincontainer}>
        <div className={styles.leaveSection}>
          <div className={styles.statsWithProgress}>
            <div className={styles.leavecontainer}>
              <div className={styles.leavecard} onClick={() => setFilter("All")}>
                <div className={styles.request}>Requested</div>
                <div className={styles.numberleave}>{Regularize.length}</div>
              </div>
              <div
                className={styles.leavecard}
                onClick={() => setFilter("Approved")}
              >
                <div className={styles.aproved}>Approved</div>
                <div className={styles.numberleave}>
                  {Regularize.filter((l) => l.status === "Approved").length}
                </div>
              </div>
              <div
                className={styles.leavecard}
                onClick={() => setFilter("Rejected")}
              >
                <div className={styles.rejected}>Rejected</div>
                <div className={styles.numberleave}>
                  {Regularize.filter((l) => l.status === "Rejected").length}
                </div>
              </div>
              <div
                className={styles.leavecard}
                onClick={() => setFilter("Pending")}
              >
                <div className={styles.pending}>Pending</div>
                <div className={styles.numberleave}>
                  {Regularize.filter((l) => l.status === "Pending").length}
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
                <FaClock className={styles.applyIcon} /> Apply Regularization
              </div>
            </div>
            <table className={styles.leaveTable}>
              <thead>
                <tr>
                  <th>
                    <FaCalendarCheck /> Applied On
                  </th>
                  <th>
                    <FaCalendarDay /> Regulariza Date
                  </th>
                  <th>
                    <FaClock /> Check In
                  </th>
                  <th>
                    <FaClock /> Check Out
                  </th>
                  <th>
                    <FaTypo3 /> Type
                  </th>
                  <th>
                    <MdOutlineFeedback /> Reason
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
                    <td>{leave.regularizaDate}</td>
                    <td>{leave.checkIn}</td>
                    <td>{leave.checkOut}</td>
                    <td>{leave.type}</td>
                    <td>{leave.reason}</td>
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
              <div className={styles.modalContent}>
                <button
                  className={styles.closeButton}
                  onClick={() => setIsModalOpen(false)}
                >
                  x
                </button>
                <RegularizationFrom oncancel={()=>setIsModalOpen(false)}/>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Regularization;
