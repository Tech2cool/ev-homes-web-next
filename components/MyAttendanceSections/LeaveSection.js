import React, { useEffect, useState, useRef } from 'react';
import styles from "./leavesection.module.css";
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import CustomSelect from '../CustomSelect';
import { FaBagShopping } from 'react-icons/fa6';
import { FaCalendarCheck, FaCalendarDay, FaDyalog, FaFileUpload, FaUser } from 'react-icons/fa';

const leaveDate = [
  {
    apply: "25 April 2025",
    startdate: "28 April 2025",
    EndDate: "29 April 2025",
    TotalDays: "2",
    LeaveType: "Paid Leave",
    Reason: "personal reson..",
    status: "Pending",
    color: "#FF9800"
  },
  {
    apply: "12 March 2025",
    startdate: "15 March 2025",
    EndDate: "20 March 2025",
    TotalDays: "6",
    LeaveType: "Paid Leave",
    Reason: "internal exam..",
    status: "Approved",
    color: "#4CAF50"
  },
  {
    apply: "02 Feb 2025",
    startdate: "05 Feb 2025",
    EndDate: "10 Feb 2025",
    TotalDays: "6",
    LeaveType: "Paid Leave",
    Reason: "For Personal..",
    status: "Rejected",
    color: "#F44336"
  },
];

export default function LeaveSection() {
  const [selectleave, setselectleave] = useState("");
  const [leaveoption, setleaveoption] = useState([]);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [numberleave, setnumberleave] = useState("");
  const [reason, setreason] = useState("");

  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const leavedataapply = [
      { value: "paid", label: "Paid Leave" },
      { value: "casual", label: "Casual Leave" },
      { value: "compensatory", label: "Compensatory Off" },
    ];
    setleaveoption(leavedataapply);
    setMounted(true);
  }, []);

  return (
    <div className={styles.maincontainer}>
      <div className={styles.LeaveSection}>
        <div className={styles.leavecontainer}>
          <div className={styles.leavecard}>
            <p className={styles.request}>Requested</p>
            <div className={styles.numberleave}>4</div>
          </div>
          <div className={styles.diveder}></div>
          <div className={styles.leavecard}>
            <p className={styles.aproved}>Approved</p>
            <div className={styles.numberleave}>2</div>
          </div>
          <div className={styles.diveder}></div>
          <div className={styles.leavecard}>
            <p className={styles.rejected}>Rejected</p>
            <div className={styles.numberleave}>1</div>
          </div>
          <div className={styles.diveder}></div>
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
              <div className={styles.context}><h6>Apply</h6><p>{Section.apply}</p></div>
              <div className={styles.context}><h6>Start Date</h6><p>{Section.startdate}</p></div>
              <div className={styles.context}><h6>End Date</h6><p>{Section.EndDate}</p></div>
              <div className={styles.context}><h6>Total Days</h6><p>{Section.TotalDays}</p></div>
              <div className={styles.context}><h6>Leave Type</h6><p>{Section.LeaveType}</p></div>
              <div className={styles.context}><h6>Reason</h6><p>{Section.Reason}</p></div>
              <div className={styles.context}><h4 style={{ color: Section.color }}>{Section.status}</h4></div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.applysection}>
        <div className={styles.form}>
          <h2>Leave Application Form</h2>

          {mounted && (
            <CustomSelect
              id="LeaveType"
              label="LeaveType"
              icon={FaBagShopping}
              options={leaveoption}
              value={selectleave}
              onChange={setselectleave}
              placeholder="Select LeaveType"
            />
          )}

          <div className={styles.maincontrol}>
            {/* Start Date */}
            <div className={styles.control} onClick={() => startDateRef.current?.showPicker()}>
              <label htmlFor="startdate" className={styles.inputLabel}>Start Date</label>
              <FaCalendarDay
                className={styles.dateicon}
            
              />
              <input
                type="date"
                ref={startDateRef}
                id="startdate"
                value={startdate}
                onChange={(e) => setstartdate(e.target.value)}
                className={styles.inputField}
              />
            </div>

            {/* End Date */}
            <div className={styles.control} onClick={() => endDateRef.current?.showPicker()}>
              <label htmlFor="enddate" className={styles.inputLabel}>End Date</label>

              <input
                type="date"
                ref={endDateRef}
                id="enddate"
                value={enddate}
                onChange={(e) => setenddate(e.target.value)}
                className={styles.inputField}
              />
              <FaCalendarDay
                className={styles.dateicon}
              
              />
            </div>

          </div>

          <div className={styles.maincontrol}>

            <div className={styles.control}>
              <label htmlFor="numberleave" className={styles.inputLabel}>Number of Day</label>
              <input
                type="text"
                id="numberleave"
                value={numberleave}
                onChange={(e) => setnumberleave(e.target.value)}
                className={styles.inputField}
                placeholder="Enter number of days"
              />
            </div>

            {/* File upload input */}
            <div className={styles.control}>
              <input
                type="file"
                id="attachment"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <div className={styles.uploadBox} onClick={() => fileInputRef.current.click()}>
                <FaFileUpload className={styles.inputIcon} />
                <span className={styles.uploadText}>Upload File</span>
              </div>
              {file && <span className={styles.fileName}>{file.name}</span>}
            </div>
          </div>



          <div className={styles.control}>
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setreason(e.target.value)}
              placeholder="Enter your reason"
              className={styles.input}
              rows={4}
            />
          </div>
          <div className={styles.button}>
          <button className={styles.submitButton}>
            Submit
          </button>

          </div>
        </div>

      </div>
    </div>


  );
}
