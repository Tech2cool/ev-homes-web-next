import React, { useEffect, useState, useRef } from "react";
import styles from "./leavesection.module.css";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import CustomSelect from "../CustomSelect";
import { FaBagShopping } from "react-icons/fa6";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaDyalog,
  FaFileUpload,
  FaUser,
} from "react-icons/fa";

const leaveDate = [
  {
    apply: "25 April 2025",
    startdate: "28 April 2025",
    EndDate: "29 April 2025",
    TotalDays: "2",
    LeaveType: "Paid Leave",
    Reason: "personal reson..",
    status: "Pending",
    color: "#FF9800",
  },
  {
    apply: "12 March 2025",
    startdate: "15 March 2025",
    EndDate: "20 March 2025",
    TotalDays: "6",
    LeaveType: "Paid Leave",
    Reason: "internal exam..",
    status: "Approved",
    color: "#4CAF50",
  },
  {
    apply: "02 Feb 2025",
    startdate: "05 Feb 2025",
    EndDate: "10 Feb 2025",
    TotalDays: "6",
    LeaveType: "Paid Leave",
    Reason: "For Personal..",
    status: "Rejected",
    color: "#F44336",
  },
];

export default function LeaveSection() {
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [numberleave, setnumberleave] = useState("");
  const [reason, setreason] = useState("");

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        <div className={styles.leavecontainer}>
          <div className={styles.leavecard}>
            <p className={styles.request}>Requested</p>
            <div className={styles.numberleave}>4</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.leavecard}>
            <p className={styles.aproved}>Approved</p>
            <div className={styles.numberleave}>2</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.leavecard}>
            <p className={styles.rejected}>Rejected</p>
            <div className={styles.numberleave}>1</div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.leavecard}>
            <p className={styles.pending}>Pending</p>
            <div className={styles.numberleave}>1</div>
          </div>
        </div>

        <div className={styles.container}>
          {leaveDate.map((Section, i) => (
            <div key={i} className={styles.info}>
              <div className={styles.vector}>
                <div className={styles.iconplan}>
                  <PiAirplaneTakeoffFill style={{ color: Section.color }} />
                </div>
              </div>
              <div className={styles.context}>
                <h6>Apply</h6>
                <p>{Section.apply}</p>
              </div>
              <div className={styles.context}>
                <h6>Start Date</h6>
                <p>{Section.startdate}</p>
              </div>
              <div className={styles.context}>
                <h6>End Date</h6>
                <p>{Section.EndDate}</p>
              </div>
              <div className={styles.context}>
                <h6>Total Days</h6>
                <p>{Section.TotalDays}</p>
              </div>
              <div className={styles.context}>
                <h6>Leave Type</h6>
                <p>{Section.LeaveType}</p>
              </div>
              <div className={styles.context}>
                <h6>Reason</h6>
                <p>{Section.Reason}</p>
              </div>
              <div className={styles.context}>
                <h4 style={{ color: Section.color }}>{Section.status}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.applysection}>
        <div className={styles.formHeadline}>Leave Application Form</div>

        <div className={styles.formControl}>
          <label htmlFor="select">
            Leave Type <span style={{ color: "red" }}>*</span>
          </label>
          <select name="select" id="select">
            <option value="first-call">Paid Leave</option>
            <option value="followup">Casual Leave</option>
            <option value="schedule-meeting">Compensation Leave</option>
          </select>
        </div>

        {/* Start Date */}
        <div
          className={styles.formControl}
          onClick={() => startDateRef.current?.showPicker()}
        >
          <label htmlFor="startdate">
            Start Date <span style={{ color: "red" }}>*</span>
          </label>
          <FaCalendarDay className={styles.dateicon} />
          <input
            type="date"
            ref={startDateRef}
            id="startdate"
            value={startdate}
            onChange={(e) => setstartdate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div
          className={styles.formControl}
          onClick={() => endDateRef.current?.showPicker()}
        >
          <label htmlFor="enddate">
            End Date <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="date"
            ref={endDateRef}
            id="enddate"
            value={enddate}
            onChange={(e) => setenddate(e.target.value)}
          />
          <FaCalendarDay className={styles.dateicon} />
        </div>

        <div className={styles.formControl}>
          <label htmlFor="numberleave">
            Number of Day <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="numberleave"
            value={numberleave}
            onChange={(e) => setnumberleave(e.target.value)}
            placeholder="Enter number of days"
          />
        </div>

        <div className={styles.formControl}>
          <input
            type="file"
            id="attachment"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />

          <div
            className={styles.uploadBox}
            onClick={() => fileInputRef.current.click()}
          >
            <FaFileUpload className={styles.inputIcon} />
            <div className={styles.textContainer}>
              <span className={styles.uploadText}>Upload File</span>
            </div>
          </div>

          {file && <span className={styles.fileName}>{file.name}</span>}
        </div>

        <div className={styles.formControl}>
          <label htmlFor="reason">
            Reason <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setreason(e.target.value)}
            placeholder="Enter your reason"
            className={styles.input}
            rows={4}
          />
        </div>
        {/* <div className={styles.button}>
          <button className={styles.submitButton}>Submit</button>
        </div> */}
      </div>
    </div>
  );
}
