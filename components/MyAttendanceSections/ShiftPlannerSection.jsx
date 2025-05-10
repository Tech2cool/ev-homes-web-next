import React, { useRef, useState } from "react";
import styles from "./leavesection.module.css";
import { FaBagShopping } from "react-icons/fa6";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
import { FaCalendarCheck, FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa6";
import ShiftPlannerForm from "./Forms/ShiftPlannerForm";
import { useClickOutside } from "../useClickOutside";

const shiftPlannerData = [
  {
    apply: "25 April 2025",
    shift: "11:00am to 7:00pm",
    shiftrequestdate: "28 April 2025",
    reason: "Personal reason..",
    status: "Pending",
  },
  {
    apply: "12 March 2025",
    shift: "11:00am to 7:00pm",
    shiftrequestdate: "15 March 2025",
    reason: "Internal exam...",
    status: "Approved",
  },
  {
    apply: "02 Feb 2025",
    shift: "11:00am to 7:00pm",
    shiftrequestdate: "05 Feb 2025",
    reason: "For personal...",
    status: "Rejected",
  },
  {
    apply: "02 Feb 2025",
    shift: "11:00am to 7:00pm",
    shiftrequestdate: "05 Feb 2025",
    reason: "For personal...",
    status: "Rejected",
  },
];

const ShiftPlannerSection = () => {
  const modalRef = useRef(null);
  const [shiftData, setshiftData] = useState(shiftPlannerData);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useClickOutside({
      refs: [modalRef],
      handler: () => setIsModalOpen(false),
      active: isModalOpen,
    });

  const filteredData =
    filter == "All"
      ? shiftData
      : shiftData.filter((shiftplan) => shiftplan.status === filter);

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{shiftData.length}</div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Approved")}
            >
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {shiftData.filter((l) => l.status === "Approved").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Rejected")}
            >
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {shiftData.filter((l) => l.status === "Rejected").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Pending")}
            >
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {shiftData.filter((l) => l.status === "Pending").length}
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
              <FaUserShield  className={styles.applyIcon} /> Request Shift
            </div>
          </div>
          <table className={styles.leaveTable}>
            <thead>
              <tr>
                <th>
                  <FaBagShopping /> Applied On
                </th>
                <th>
                  <FaBagShopping /> Shift
                </th>
                <th>
                  <FaCalendarDay /> Shift Request Date
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
              {filteredData.map((shiftplan, index) => (
                <tr key={index}>
                  <td>{shiftplan.apply}</td>
                  <td>{shiftplan.shift}</td>
                  <td>{shiftplan.shiftrequestdate}</td>
                  <td>{shiftplan.reason}</td>
                  <td>
                    <span
                      className={
                        shiftplan.status === "Approved"
                          ? styles.statusApproved
                          : shiftplan.status === "Rejected"
                          ? styles.statusRejected
                          : styles.statusPending
                      }
                    >
                      {shiftplan.status}
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
              <ShiftPlannerForm oncencel={()=>setIsModalOpen(false)}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftPlannerSection;
