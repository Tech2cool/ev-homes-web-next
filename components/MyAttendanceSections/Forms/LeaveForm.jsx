import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

const LeaveForm = ({oncancel}) => {
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [numberleave, setnumberleave] = useState("");
  const [reason, setreason] = useState("");

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  return (
    <div>
      <div className={styles.formHeadline}>Leave Application Form</div>
      <div className={styles.formControl}>
        <label htmlFor="select">
          <FaPersonWalkingLuggage /> Leave Type{" "}
          <span style={{ color: "red" }}>*</span>
        </label>
        <select name="select" id="select">
          <option value="first-call">Paid Leave</option>
          <option value="followup">Casual Leave</option>
          <option value="schedule-meeting">Compensation Leave</option>
        </select>
      </div>
      <div className={styles.dateSection}>
        <div
          className={`${styles.formControlForDate} ${styles.formControl}`}
          onClick={() => startDateRef.current?.showPicker()}
        >
          <label htmlFor="startdate">
            <FaCalendarDay /> Start Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            ref={startDateRef}
            id="startdate"
            value={startdate}
            onChange={(e) => setstartdate(e.target.value)}
          />
        </div>
        <div
          className={`${styles.formControlForDate} ${styles.formControl}`}
          onClick={() => endDateRef.current?.showPicker()}
        >
          <label htmlFor="enddate">
            <FaCalendarDay /> End Date <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="date"
            ref={endDateRef}
            id="enddate"
            value={enddate}
            onChange={(e) => setenddate(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.formControl}>
        <label htmlFor="numberleave">
          <FaCalendarDay /> Number of Day{" "}
          <span style={{ color: "red" }}>*</span>
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
          <div>
            <span className={styles.uploadText}>Upload File</span>
          </div>
        </div>

        {file && <span className={styles.fileName}>{file.name}</span>}
      </div>
      <div className={styles.radioSection}>
        <label>
          <input type="radio" name="dayType" value="full" defaultChecked />
          Full Day
        </label>
        <label>
          <input type="radio" name="dayType" value="half" />
          Half Day
        </label>
      </div>

      <div className={styles.formControl}>
        <label htmlFor="reason">
          <MdOutlineFeedback /> Reason <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setreason(e.target.value)}
          placeholder="Enter your reason"
          rows={4}
        />
      </div>
      <div className={styles.buttonRow}>
        <button className={styles.cancelButton}  onClick={oncancel} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
