import React, { useState, useEffect, useRef } from "react";
import styles from "../Dialogs/assigndialog.module.css";
import style from "./schedulemeetingdialog.module.css";
import { ImCross } from "react-icons/im";

const Schedulemeetingdialog = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [is24Hour, setIs24Hour] = useState(true);
  const [amPm, setAmPm] = useState(new Date().getHours() >= 12 ? "PM" : "AM");

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const itemHeight = 40;

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

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop =
        hour * itemHeight - hourRef.current.clientHeight / 2 + itemHeight / 2;
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTop =
        minute * itemHeight -
        minuteRef.current.clientHeight / 2 +
        itemHeight / 2;
    }
  }, []);

  const handleScroll = (ref, setter) => {
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(
      (scrollTop + ref.current.clientHeight / 2 - itemHeight / 2) / itemHeight
    );
    setter(index);
  };

  const handleConfirm = () => {
    const selected = new Date(date);
    let adjustedHour = hour;

    if (!is24Hour) {
      if (amPm === "PM" && hour < 12) {
        adjustedHour += 12;
      } else if (amPm === "AM" && hour === 12) {
        adjustedHour = 0;
      }
    }

    selected.setHours(adjustedHour);
    selected.setMinutes(minute);
    console.log("Selected Date & Time:", selected.toString());
    onClose();
  };

  const formatTime = (h, m) => {
    if (!is24Hour) {
      const displayHour = h % 12 || 12;
      return `${String(displayHour).padStart(2, "0")}:${String(m).padStart(
        2,
        "0"
      )} ${amPm}`;
    }
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const handleAmPmChange = (e) => {
    const value = e.target.value;
    setAmPm(value);
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}><ImCross color="#C41E3A"/></button>
        <h2>Schedule Meeting</h2>
        <p>Select Date & Time</p>

        <div className={style.timePickerWrapper}>
          <label>
            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </label>

          <div className={style.timeContainer}>
            <div
              className={style.wheelWrapper}
              ref={hourRef}
              onScroll={() => handleScroll(hourRef, setHour)}
            >
              <div className={style.wheel}>
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className={`${style.wheelItem} ${
                      i === hour ? style.active : ""
                    }`}
                  >
                    {is24Hour
                      ? String(i).padStart(2, "0")
                      : String(i % 12 || 12).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>
            <div><h2>:</h2></div>
            <div
              className={style.wheelWrapper}
              ref={minuteRef}
              onScroll={() => handleScroll(minuteRef, setMinute)}
            >
              <div className={style.wheel}>
                {Array.from({ length: 60 }, (_, i) => (
                  <div
                    key={i}
                    className={`${style.wheelItem} ${
                      i === minute ? style.active : ""
                    }`}
                  >
                    {String(i).padStart(2, "0")}
                  </div>
                ))}
              </div>
            </div>

            {!is24Hour && (
              <select
                value={amPm}
                onChange={handleAmPmChange}
                className={style.ampmDropdown}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            )}
          </div>

          <label>
            <input
              type="checkbox"
              checked={is24Hour}
              onChange={() => setIs24Hour(!is24Hour)}
            />
            24h
          </label>

          <h3>{formatTime(hour, minute)}</h3>
          <p>{date.toDateString()}</p>

          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Schedulemeetingdialog;
