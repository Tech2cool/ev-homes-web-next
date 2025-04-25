import React from "react";
import styles from "./attendancesection.module.css";
import { FaClock } from "react-icons/fa";
import { FcOvertime } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { MdOutlineHorizontalRule } from "react-icons/md";

const data = [
  {
    name: "Shruti Misal",
    timeIn: "10:02 AM",
    timeOut: "07:00 PM",
    workingTime: "8h 56m",
    overtime: "2h 12m",
    timeInLocation: "0.99585698569",
    timeOutLocation: "0.99585698569",
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
    phoneNumber: "6365698569",
    timeInImage: "",
    timeOutImage: "",
    status:"present",
    date:"25 April 2024",
  },
  {
    name: "Shruti Misal",
    timeIn: "10:02 AM",
    timeOut: "07:00 PM",
    workingTime: "8h 56m",
    overtime: "2h 12m",
    timeInLocation: "0.99585698569",
    timeOutLocation: "0.99585698569",
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
    phoneNumber: "6365698569",
    timeInImage: "",
    timeOutImage: "",
    status: "present",
    date:"25 April 2024",
  },
  {
    name: "Shruti Misal",
    timeIn: "10:02 AM",
    timeOut: "07:00 PM",
    workingTime: "8h 56m",
    overtime: "2h 12m",
    timeInLocation: "0.99585698569",
    timeOutLocation: "0.99585698569",
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
    phoneNumber: "6365698569",
    timeInImage: "",
    timeOutImage: "",
    status: "absent",
    date:"25 April 2024",
  },
  {
    name: "Shruti Misal",
    timeIn: "10:02 AM",
    timeOut: "07:00 PM",
    workingTime: "8h 56m",
    overtime: "2h 12m",
    timeInLocation: "0.99585698569",
    timeOutLocation: "0.99585698569",
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
    phoneNumber: "6365698569",
    timeInImage: "",
    timeOutImage: "",
    status: "week off",
    date:"25 April 2024",
  },
  {
    name: "Shruti Misal",
    timeIn: "10:02 AM",
    timeOut: "07:00 PM",
    workingTime: "8h 56m",
    overtime: "2h 12m",
    timeInLocation: "0.99585698569",
    timeOutLocation: "0.99585698569",
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
    phoneNumber: "6365698569",
    timeInImage: "",
    timeOutImage: "",
    status: "present",
    date:"25 April 2024",
  },
];

const Attendancesection = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>
              <FaClock /> Time In & Time Out
            </th>
            <th>Date</th>
            <th>
              <FcOvertime /> Overtime
            </th>
            <th>
              <FaLocationDot /> Location
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp, idx) => (
            <tr key={idx}>
              <td
                className={`${styles.empSection} ${
                  emp.status === "present"
                    ? styles.statusPresent
                    : emp.status === "absent"
                    ? styles.statusAbsent
                    : emp.status === "week off"
                    ? styles.statusWeekOff
                    : ""
                }`}
              >
                <div className={styles.employeeInfo}>
                  <img
                    src={emp.profilePic}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <div className={styles.namePhone}>
                    <div className={styles.employeeName}>{emp.name}</div>
                    <div className={styles.phoneNumber}>{emp.phoneNumber}</div>
                  </div>
                </div>
              </td>

              <td className={styles.timeContainer}>
                <div className={styles.timeline}>
                  <img
                    src={
                      emp.timeInImage ||
                      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                    }
                    alt="Time In"
                    className={styles.timeImage}
                  />
                  <span className={styles.timein}>{emp.timeIn}</span>
                  <span className={styles.dot}>
                    <BsDot />
                  </span>
                  <div>
                    <MdOutlineHorizontalRule className={styles.line} />
                  </div>
                  <span className={styles.workingTime}>{emp.workingTime}</span>
                  <div>
                    <MdOutlineHorizontalRule className={styles.line} />
                  </div>
                  <span className={styles.dot}>
                    <BsDot />
                  </span>
                  <span className={styles.timeout}>{emp.timeOut}</span>
                  <img
                    src={
                      emp.timeOutImage ||
                      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                    }
                    alt="Time Out"
                    className={styles.timeImage}
                  />
                </div>
              </td>
              <td className={styles.date}>{emp.date}</td>

              <td>{emp.overtime}</td>
              <td className={styles.location}>
                {emp.timeInLocation} - {emp.timeOutLocation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendancesection;
