"use client";
import { FilterCard } from "@/components/FilterCard/Filtercard";
import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddashboardcards from "@/components/LeadsDashboardCards/Leaddashboardcards";
import React, { useEffect, useState } from "react";
import styles from "./leads.module.css";
import Leaddetailspage from "@/components/LeadDetails/Leaddetailspage";
import Leadshistory from "@/components/LeadsHistory/Leadshistory";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useData } from "@/context/dataContext";
import { IoArrowBackCircleOutline } from "react-icons/io5"; 


const LeadsPage = () => {
  const { fetchSaleExecutiveLeads, leadInfo, leads } = useData();

  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const isMobile = useIsMobile();

  const handleLeadClick = (lead) => {
    setSelectedLeadId(lead?._id);
    setSelectedLead(lead);
  };
  const handleBack = () => {
    setSelectedLeadId(null);
  };

  useEffect(() => {
    fetchSaleExecutiveLeads("ev128-ranjana-parmar", 1, 10);

    if (isMobile === undefined) return;

    if (!isMobile && selectedLeadId === null) {
      // setSelectedLeadId();
    }
  }, [isMobile, selectedLeadId]);

  return (
    <div className={styles.fullContainer}>
      {!(isMobile && selectedLeadId) && <Leaddashboardcards />}

      {isMobile ? (
        selectedLeadId ? (
          <div>
            <div className={styles.backButtonWrapper}>
              <IoArrowBackCircleOutline
                size={20}
                onClick={handleBack}
                className={styles.backIcon}
              />
            </div>

            <Leaddetailspage lead={selectedLead} id={selectedLeadId} />
          </div>
        ) : (
          <Leadlistpage initialLeads={leads} onLeadClick={handleLeadClick} />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <Leadlistpage initialLeads={leads} onLeadClick={handleLeadClick} />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedLeadId ? (
              <Leaddetailspage lead={selectedLead} id={selectedLeadId} />
            ) : (
              <div className={styles.messageWrapper}>
                <p>Select a lead to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
