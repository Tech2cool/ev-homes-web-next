import React, { useState, useRef } from "react";
import styles from "./leavesection.module.css";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { FaBagShopping } from "react-icons/fa6";
import {
  MdOutlineFeedback,
  MdOutlineCallToAction,
  MdAttachMoney,
  MdFilterList,
} from "react-icons/md";
import { FaCalendarCheck, FaFileUpload } from "react-icons/fa";
import ReimbursementForm from "./Forms/ReimbursementForm";
import ReimbursementFilterDialog from "../Dialogs/ReimbursementFilterDialog";
import { useClickOutside } from "../useClickOutside";

const initialLeaveData = [
  {
    date: "25 April 2025",
    reimburseType: "Food",
    amount: "20000",
    approvalBy: "Deepak Karki",
    remark: "Personal reason..",
    attachFile: "",
    attachBillInvoice: "",
    status: "Pending",
  },
  {
    date: "25 April 2025",
    reimburseType: "Food",
    amount: "20000",
    approvalBy: "Deepak Karki",
    remark: "Personal reason..",
    attachFile: "",
    attachBillInvoice: "",
    status: "Pending",
  },
  {
    date: "25 April 2025",
    reimburseType: "Food",
    amount: "20000",
    approvalBy: "Deepak Karki",
    remark: "Personal reason..",
    attachFile: "",
    attachBillInvoice: "",
    status: "Approved",
  },
  {
    date: "25 April 2025",
    reimburseType: "Food",
    amount: "20000",
    approvalBy: "Deepak Karki",
    remark: "Personal reason..",
    attachFile: "",
    attachBillInvoice: "",
    status: "Rejected",
  },
];

export default function ReimbursementSection() {
  const modalRef = useRef(null);

  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData =
    filter == "All"
      ? leaveData
      : leaveData.filter((leave) => leave.status === filter);

  const [showReimDropdown, setShowReimDropdown] = useState(false);

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

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

            <div
              className={styles.filterReimbursement}
              onClick={() => setShowReimDropdown(true)}
            >
              <MdFilterList size={20} />
              <span>Filter Reimbursement Data</span>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div
              className={styles.applyButton}
              onClick={() => setIsModalOpen(true)}
            >
              <MdAttachMoney className={styles.applyIcon} /> Apply Reimbursement
            </div>
          </div>
          <table className={styles.leaveTable}>
            <thead>
              <tr>
                <th>
                  <FaBagShopping /> Date
                </th>
                <th>
                  <PiAirplaneTakeoffFill /> Reimbursement Type
                </th>
                <th>
                  <FaCalendarCheck /> Amount
                </th>
                <th>
                  <FaCalendarCheck /> Approval By
                </th>
                <th>
                  <MdOutlineFeedback /> Remark
                </th>
                <th>
                  <FaFileUpload /> Attach File
                </th>
                <th>
                  <FaFileUpload /> Attach Bill Invoice
                </th>
                <th>
                  <MdOutlineCallToAction /> Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.date}</td>

                  <td>{leave.reimburseType}</td>
                  <td>{leave.amount}</td>
                  <td>{leave.approvalBy}</td>
                  <td>{leave.remark}</td>
                  <td>
                    {leave.attachFile ? (
                      <a
                        href={leave.attachFile}
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
                    {leave.attachBillInvoice ? (
                      <a
                        href={leave.attachBillInvoice}
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
              <ReimbursementForm />
            </div>
          </div>
        )}

        {showReimDropdown && (
          <ReimbursementFilterDialog
            onClose={() => setShowReimDropdown(false)}
            onApplyFilter={(selectedOption) => {
              console.log("Apply filter with:", selectedOption);
              setShowReimDropdown(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
