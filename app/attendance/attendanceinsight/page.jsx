import React from 'react'
import Attendanceheader from "@/components/AllAttendance/Attendanceheader";
import Attendancesummarycards from "@/components/AllAttendance/Attendancesummarycards";
import Attendancefiltersection from "@/components/AllAttendance/Attendancefiltersection";



const Attendanceinsight = () => {
  return (
    <div>
        <Attendanceheader/>
      <Attendancesummarycards/>
      <Attendancefiltersection/>
      
    </div>
  )
}

export default Attendanceinsight;

