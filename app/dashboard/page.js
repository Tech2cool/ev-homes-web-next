import Leadcards from "@/components/LeadCards/Leadcards";
import Linegraphcard from "@/components/Graph/Linegraphcard";
import Navbar from "@/components/NavBar/Navbar";
import Piegraphcard from "@/components/Graph/Piegraphcard";
import Quickaccessoptions from "@/components/QuickAccess/Quickaccessoptions";
import styles from "./homepage.module.css";
import React from "react";
import Extraoptions from "@/components/ExtraOptions/Extraoptions";
import Taskcards from "@/components/TaskCards/Taskcards";
import Remindercard from "@/components/ReminderCard/Remindercard";

const Dashboard = () => {
  return (
    <div>
      {/* <Leadcards />
      <Extraoptions />
      <div className={styles.lineTaskContainer}>
        <Linegraphcard />
        <Taskcards />
        <Extraoptions />
      </div>
      <div className={styles.ReminPieContainer}>
        <Remindercard />
        <Piegraphcard  Healine="Lead to Visit 1"  percentage="2.0%" status="Visits" lableone="Leads" labletwo="Visits 1" valueone="1000" valuetwo="500" colors={["#4F959D", "#98D2C0"]}/>
        <Piegraphcard Healine="Visit 1 to Booking" percentage="1.0%" status="Visits" lableone="Visits 1 " labletwo="Booking" valueone="500" valuetwo="100" colors={["#7469B6", "#E1AFD1"]}/>
        <Piegraphcard Healine="Visit 2 to Booking" percentage="0%" status="Booking" lableone="Visits 2" labletwo="Booking" valueone="300" valuetwo="90" colors={["#824D74", "#FDAF7B"]}/>
        <Piegraphcard Healine="Lead to Booking" percentage="2.5%" status="Booking" lableone="Leads" labletwo="Booking" valueone="1000" valuetwo="190" colors={["#C96868", "#7EACB5"]}/>
      </div> */}
    </div>
  );
};

export default Dashboard;
