import Attendanceheader from "@/components/AttendanceDashboard/Attendanceheader";
import Myattendance from "@/components/AttendanceDashboard/Myattendance";
import React from "react";
import styles from "./attendance.module.css";
import Attendancecards from "@/components/AttendanceDashboard/Attendancecards";
import { Attendanceinsight } from "@/components/AttendanceDashboard/Attendanceinsight";
import AttendanceCalendar from "@/components/AttendanceDashboard/Attendancecalendar";

const AttendancePage = () => {
  return (
    <div>
      <Attendanceheader />
      <div className={styles.mainContent}>
        
        <div className={styles.attendanceContainer}>
          <Myattendance />
        </div>

        
        <div className={styles.rightContent}>
          <Attendancecards />
          <div className={styles.attinscalContainer}>
          <Attendanceinsight />
          <AttendanceCalendar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
