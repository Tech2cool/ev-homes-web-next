import React from "react";
import styles from "../leads/leads.module.css";

import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddetailspage from "@/components/LeadDetails/Leaddetailspage";
import FollowupTopCard from "@/components/FollowUp/FollowupTopCard";


const FollowUp = ()=>{
return(
    <div className={styles.fullContainer}>
       <FollowupTopCard/>
       <div className={styles.listDetailsContainer}>
     <div className={styles.listContainer}><Leadlistpage/></div>
     <div className={styles.listHistoryContainer}><Leaddetailspage/>
     </div>
       </div>
    </div>
);

}
export default FollowUp;