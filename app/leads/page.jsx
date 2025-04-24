"use client";
import Leadlistpage from "@/components/LeadListPage/Leadlistpage";
import Leaddashboardcards from "@/components/LeadsDashboardCards/Leaddashboardcards";
import React, { useCallback, useEffect, useState } from "react";
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
    leadInfo,
    fetchingMoreLeads,
  } = useData();

  const isMobile = useIsMobile();
  const loadMoreLeads = useCallback(async () => {
    try {
      await fetchSaleExecutiveLeads(user?._id, "", leadInfo?.page + 1 ?? 1, 10);
    } catch (err) {
      console.error("Error loading more leads:", err);
    }
  }, [leadInfo?.page]);

  const handleLeadClick = (lead) => {
    updateCurrentLead(lead);
  };
  const handleBack = () => {
    updateCurrentLead(null);
  };

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSaleExecutiveLeads(user?._id, 1, 10);
    }
  }, [user, loading]);

  // if (loading || !user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.fullContainer}>
      {!(isMobile && currentLead) && <Leaddashboardcards />}

      {isMobile ? (
        currentLead ? (
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
          <Leadlistpage
            leads={leads}
            isLoading={loading || loadingLeads}
            onLeadClick={handleLeadClick}
            loadMoreLeads={loadMoreLeads}
            fetchingMoreLeads={fetchingMoreLeads}
          />
        )
      ) : (
        <div className={styles.listDetailsContainer}>
          <div className={styles.listContainer}>
            <Leadlistpage
              leads={leads}
              isLoading={loading || loadingLeads}
              onLeadClick={handleLeadClick}
              loadMoreLeads={loadMoreLeads}
              fetchingMoreLeads={fetchingMoreLeads}
            />
          </div>
          <div className={styles.listHistoryContainer}>
            {currentLead ? (
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
