"use client";
import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddashboardcards from "@/components/LeadsDashboardCards/Leaddashboardcards";
import React, { useEffect, useState } from "react";
import styles from "./leads.module.css";
import Leaddetailspage from "@/components/LeadDetails/Leaddetailspage";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useData } from "@/context/dataContext";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useUser } from "@/context/UserContext";

const LeadsPage = () => {
  const { user, loading } = useUser();
  const {
    fetchSaleExecutiveLeads,
    leads,
    updateCurrentLead,
    currentLead,
    loadingLeads,
  } = useData();

  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const isMobile = useIsMobile();

  const handleLeadClick = (lead) => {
    setSelectedLeadId(lead?._id);
    setSelectedLead(lead);
    updateCurrentLead(lead);
  };
  const handleBack = () => {
    setSelectedLeadId(null);
    updateCurrentLead(null);
  };

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSaleExecutiveLeads(user?._id, 1, 10);
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

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

            <Leaddetailspage lead={currentLead} id={currentLead?._id} />
          </div>
        ) : (
          <Leadlistpage initialLeads={leads} onLeadClick={handleLeadClick} />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <Leadlistpage
              initialLeads={leads}
              isLoading={loading ?? loadingLeads}
              onLeadClick={handleLeadClick}
            />
          </div>
          <div className={styles.listHistoryContainer}>
            {selectedLeadId ? (
              <Leaddetailspage
                isLoading={loadingLeads}
                lead={currentLead}
                id={currentLead?._id}
                onLeadClick={handleLeadClick}
              />
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
