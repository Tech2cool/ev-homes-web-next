import React, { useEffect, useState, useRef } from "react";
import styles from "./assigndialog.module.css";
import style from "./updatestatusdialog.module.css";
import { ImCross } from "react-icons/im";
import { useData } from "@/context/dataContext";

const Updatestatusdialog = ({ onClose, lead, task }) => {
  const { updateFeedback, getLeadById } = useData();
  const [isClosing, setIsClosing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStage, setSelectedStage] = useState("first-call");
  const [callStatus, setCallStatus] = useState("Call Done");
  const [cleintStatus, setClientStatus] = useState("interested");
  const [leadStatus, setLeadStatus] = useState("cold");
  const [feedback, setFeedback] = useState("");

  const [photos, setPhotos] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const timeInputRef = useRef(null);
  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
    }
  }, [isClosing, onClose]);

  const formatDisplayDateTime = () => {
    if (!selectedDate || !selectedTime) return "";
    const dateObj = new Date(`${selectedDate}T${selectedTime}`);
    return dateObj
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(",", " at");
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    if (type === "photo") setPhotos((prev) => [...prev, ...files]);
    else if (type === "recording") setRecordings((prev) => [...prev, ...files]);
  };

  const removeFile = (index, type) => {
    if (type === "photo")
      setPhotos((prev) => prev.filter((_, i) => i !== index));
    else if (type === "recording")
      setRecordings((prev) => prev.filter((_, i) => i !== index));
  };

  const onChangeStage = (e) => {
    setSelectedStage(e.target.value);
    // console.log(e.target.value);
  };

  const onChangeCallStatus = (e) => {
    setCallStatus(e.target.value);
    // console.log(e.target.value);
  };
  const onChangeClientStatus = (e) => {
    setClientStatus(e.target.value);
    // console.log(e.target.value);
  };
  const onChangeLeadStatus = (e) => {
    setLeadStatus(e.target.value);
    // console.log(e.target.value);
  };
  const onChangeFeedback = (e) => {
    setFeedback(e.target.value);
    // console.log(e.target.value);
  };

  const onSubmit = async () => {
    const dateObj = new Date(`${selectedDate}T${selectedTime}`);

    let data = {
      taskCompleted: "completed",
      stage: selectedStage,
      status: callStatus,
      leadStatus: leadStatus,
      intrestedStatus: cleintStatus,
      // 'siteVisitInterested': selectedIntVisitStatus,
      // 'siteVisitInterestedDate': _selectedDate?.toIso8601String(),
      reminderDate: dateObj?.toISOString(),
      feedback: feedback,
      // 'document': images.isNotEmpty ? images[0] : '',
      // 'recording': recordings.isNotEmpty ? recordings[0] : '',
      task: task?._id,
      lead: lead?._id,
    };
    await updateFeedback(data);
    await getLeadById(lead?._id);

    onClose();
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <ImCross color="#C41E3A" />
        </button>
        <h2>Update Feedback</h2>
        <div className={styles.formControl}>
          <label htmlFor="select">Lead Stage <span style={{ color: 'red' }}>*</span></label>
          <select name="select" id="select" onChange={onChangeStage}>
            <option value="first-call">First Call</option>
            <option value="followup">Follow Up</option>
            <option value="schedule-meeting">Schedule Meeting</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="select">Call Status <span style={{ color: 'red' }}>*</span></label>
          <select name="select" id="select" onChange={onChangeCallStatus}>
            <option value="Call Done">Call Done</option>
            <option value="Call Not Received">Call Not Received</option>
            <option value="Call Cancelled">Call Cancelled</option>
            <option value="Call Busy">Call Busy</option>
            <option value="Not Reachable">Not Reachable</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="select">Interested Status <span style={{ color: 'red' }}>*</span></label>
          <select name="select" id="select" onChange={onChangeClientStatus}>
            <option value="interested">Interested</option>
            <option value="not-interested">Not Interested</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="select">Lead Status <span style={{ color: 'red' }}>*</span></label>
          <select name="select" id="select" onChange={onChangeLeadStatus}>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
            <option value="hot">Hot</option>
          </select>
        </div>

        <div className={styles.formControl}>
          <label>Reminder Date & Time</label>
          <div>
            <div className={styles.formControl}>
              <label>Select Reminder Date  <span style={{ color: 'red' }}>*</span></label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setTimeout(() => {
                    timeInputRef.current?.focus();
                  }, 100);
                }}
              />
            </div>
            <div className={styles.formControl}>
              <label>Select Reminder Time  <span style={{ color: 'red' }}>*</span></label>
              <input
                type="time"
                value={selectedTime}
                ref={timeInputRef}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
          </div>
          {selectedDate && selectedTime && <div>{formatDisplayDateTime()}</div>}
        </div>
        <div className={styles.formControl}>
          <label htmlFor="text">Feedback  <span style={{ color: 'red' }}>*</span></label>
          <textarea name="text" rows="5" onChange={onChangeFeedback} />
        </div>

        {/* <div className={styles.formControl}>
          <div className={style.attachmentHeader}>
            <h4 className={style.attachmentHeading}>Attachment - Photos</h4>
            <div className={style.addIcon}>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => handleFileChange(e, "photo")}
                />
                +
              </label>
            </div>
          </div>
          {photos.map((photo, index) => (
            <div key={index} className={style.fileItem}>
              <span>{photo.name}</span>
              <button
                type="button"
                className={style.removeBtn}
                onClick={() => removeFile(index, "photo")}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div className={styles.formControl}>
          <div className={style.attachmentHeader}>
            <h4 className={style.attachmentHeading}>Attachment - Recording</h4>
            <div className={style.addIcon}>
              <label>
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  hidden
                  onChange={(e) => handleFileChange(e, "recording")}
                />
                +
              </label>
            </div>
          </div>

          {recordings.map((recording, index) => (
            <div key={index} className={style.fileItem}>
              <span>{recording.name}</span>
              <button
                type="button"
                className={style.removeBtn}
                onClick={() => removeFile(index, "recording")}
              >
                ❌
              </button>
            </div>
          ))}
        </div> */}

        <div className={styles.buttonGroup}>
          <button className={styles.submitButton} onClick={onSubmit}>
            Submit
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updatestatusdialog;
