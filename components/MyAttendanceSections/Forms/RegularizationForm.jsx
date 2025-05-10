import React, { useRef, useState } from "react";
import styles from "./leaveform.module.css";
import { FaCalendarDay, FaClock, } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";
import { FaCalendarDays, FaClockRotateLeft, FaTypo3 } from "react-icons/fa6";

const RegularizationFrom = () => {
    const [checkIn, setcheckIn] = useState("");
    const [reason, setreason] = useState("");
    const [checkout, setcheckout] = useState("");
    const [regularizatype, setlregularizatype] = useState("Week-Off",)
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);

    return (
        <div>
            <div className={styles.formHeadline}>Regularization Off Application Form</div>
            <div className={styles.formControl}>
                <label htmlFor="select">
                    <FaCalendarDays /> Regularization Type{" "}
                    <span style={{ color: "red" }}>*</span>
                </label>
                <select name="select" id="select" value={regularizatype} onChange={(e) => setlregularizatype(e.target.value)}>
                    <option value="Week-Off">Week Off</option>
                    <option value="Present">Present</option>
                    <option value="Half-Day">Half Day</option>
                </select>

            </div>
            {regularizatype !== "Week-Off" && (
                <>
                    <div
                        className={` ${styles.formControl}`}
                        onClick={() => checkInRef.current?.showPicker()}
                    >
                        <label htmlFor="Check-In">
                            <FaClockRotateLeft />Check In<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="Time"
                            ref={checkInRef}
                            id="weekoffdate"
                            value={checkIn}
                            onChange={(e) => setcheckIn(e.target.value)}
                        />
                    </div>
                    <div
                        className={` ${styles.formControl}`}
                        onClick={() => checkOutRef.current?.showPicker()}
                    >
                        <label htmlFor="Check-In">
                            <FaClockRotateLeft />Check Out<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="Time"
                            ref={checkOutRef}
                            id="weekoffdate"
                            value={checkout}
                            onChange={(e) => setcheckout(e.target.value)}
                        />
                    </div>
                </>
            )}



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

export default RegularizationFrom;
