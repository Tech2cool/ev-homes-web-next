import React from "react";
import styles from "../../leads/leads.module.css";
import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddetailspage from "@/components/LeadDetails/Leaddetailspage";
import LineUptopCard from "@/components/LineUp/LineUptopCard";


const   LineUp = ()=>{
return(
    <div className={styles.fullContainer}>
       <LineUptopCard/>
       <div className={styles.listDetailsContainer}>
     <div className={styles.listContainer}><Leadlistpage/></div>
     <div className={styles.listHistoryContainer}><Leaddetailspage/>
     </div>
       </div>
    </div>
);

}
export default LineUp;