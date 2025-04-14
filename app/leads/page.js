"use client";
import { FilterCard } from "@/components/FilterCard/Filtercard";
import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddashboardcards from "@/components/LeadsDashboardCards/Leaddashboardcards";
import React, { useEffect, useState } from "react";
import styles from "./leads.module.css";
import Leaddetailspage from "@/components/LeadDetails/Leaddetailspage";
import Leadshistory from "@/components/LeadsHistory/Leadshistory";
import { useIsMobile } from "@/hooks/useIsMobile";

const LeadsPage = () => {
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const isMobile = useIsMobile();

  const handleLeadClick = (leadId) => {
    setSelectedLeadId(leadId);
  };
  const handleBack = () => {
    setSelectedLeadId(null);
  };

  useEffect(() => {
    if (!isMobile) {
      setSelectedLeadId("1");
    }
  }, [isMobile]);

  return (
    <div className={styles.fullContainer}>
      <Leaddashboardcards />
      {isMobile ? (
        selectedLeadId ? (
          <div>
            <button onClick={handleBack}>Back</button>
            <Leaddetailspage leadId={selectedLeadId} />
          </div>
        ) : (
          <Leadlistpage onLeadClick={handleLeadClick} />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <Leadlistpage onLeadClick={handleLeadClick} />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedLeadId ? (
              <Leaddetailspage leadId={selectedLeadId} />
            ) : (
              <p>Select a lead to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
