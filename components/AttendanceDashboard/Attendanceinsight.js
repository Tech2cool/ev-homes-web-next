import React from "react";
import styles from "./attendanceinsight.module.css";

const Attendanceinsight = () => {
  const attendanceData = [
    {
      name: "Dummy Dumm",
      timeIn: "09:00 AM",
      timeOut: "06:00 PM",
      status: "Present",
    },
    {
      name: "Dummy Dumm",
      timeIn: "09:00 AM",
      timeOut: "06:00 PM",
      status: "Present",
    },
    {
      name: "Dummy Dumm",
      timeIn: "09:00 AM",
      timeOut: "06:00 PM",
      status: "Present",
    },
    {
      name: "Dummy Dumm",
      timeIn: "09:00 AM",
      timeOut: "06:00 PM",
      status: "Present",
    },
  ];

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>Attendance Insight</h2> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Time In Image</th>
            <th>Time Out Image</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.timeIn}</td>
              <td>{employee.timeOut}</td>
              <td>
                <button className={styles.viewButton}>View</button>
              </td>
              <td>
                <button className={styles.viewButton}>View</button>
              </td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Attendanceinsight };
