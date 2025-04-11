import React, { useEffect, useState, useRef } from "react";
import styles from "./assigndialog.module.css";
import style from "./updatestatusdialog.module.css";

const Updatestatusdialog = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
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

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}></button>
        <h2>Update Feedback</h2>
        <div className={styles.formControl}>
          <label htmlFor="select">Lead Stage</label>
          <select name="select" id="select">
            <option value="opt1">First Call</option>
            <option value="opt2">Follow Up</option>
            <option value="opt3">Virtual Meeting</option>
          </select>
        </div>
        <div className={styles.formControl}>
          <label>Reminder Date & Time</label>
          <div>
            <div className={styles.formControl}>
              <label>Select Reminder Date</label>
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
              <label>Select Reminder Time</label>
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
          <label htmlFor="text">Feedback</label>
          <textarea name="text" rows="5" />
        </div>

        <div className={styles.formControl}>
          <div className={style.attachmentHeader}>
            <h4 className={style.attachmentHeading}>Attachment - Photos</h4>
            <div  className={style.addIcon}>
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
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.submitButton}>Submit</button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updatestatusdialog;
