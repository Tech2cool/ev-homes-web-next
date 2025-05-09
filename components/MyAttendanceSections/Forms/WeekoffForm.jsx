import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaFileUpload } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";

const WeekOffForm = () => {
  const [weekoffdate, setweekoffdate] = useState("");
  const [reason, setreason] = useState("");

  const weekoffDateRef = useRef(null);

  return (
    <div>
      <div className={styles.formHeadline}>Week Off Application Form</div>

      <div
        className={` ${styles.formControl}`}
        onClick={() => weekoffDateRef.current?.showPicker()}
      >
        <label htmlFor="weekoffdate">
          <FaCalendarDay /> WeekOff Date <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="date"
          ref={weekoffDateRef}
          id="weekoffdate"
          value={weekoffdate}
          onChange={(e) => setweekoffdate(e.target.value)}
        />
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
        <button className={styles.cancelButton} type="button">
          Cancel
        </button>
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default WeekOffForm;
