"use client";
import Attendanceheader from "@/components/AllAttendance/Attendanceheader";
// import Myattendance from "@/components/AttendanceDashboard/Myattendance";
import React, { useState } from "react";
// import styles from "./attendance.module.css";
import Attendancesummarycards from "@/components/AllAttendance/Attendancesummarycards";
import Attendancefiltersection from "@/components/AllAttendance/Attendancefiltersection";
// import Attendancecards from "@/components/AttendanceDashboard/Attendancecards";
// import { Attendanceinsight } from "@/components/AttendanceDashboard/Attendanceinsight";
// import AttendanceCalendar from "@/components/AttendanceDashboard/Attendancecalendar";

const AttendancePage = () => {
  return (
    
    <div>
      {/* <Attendanceheader />
      <div className={styles.mainContent}>
        <div className={styles.attendanceContainer}>
          <Myattendance />
        </div>

        <div className={styles.rightContent}>
          <Attendancecards />
          <div className={styles.attinscalContainer}>
            <Attendanceinsight />
            <AttendanceCalendar />
          </div>
        </div>
      </div> */}
      <Attendanceheader/>
      <Attendancesummarycards/>
      <Attendancefiltersection/>
    </div>
  );
};

export default AttendancePage;
