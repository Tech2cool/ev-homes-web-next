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
import useDebounce from "@/hooks/useDebounce";

const LeadsPage = () => {
  const { user, loading } = useUser();
  const [query, setQuery] = useState("");

  const [selectedFilter, setSelectedFilter] = useState({
    status: null,
    callData: null,
    cycle: null,
    order: null,
    clientstatus: null,
    leadstatus: null,
    startDate: null,
    endDate: null,
    date: null,
    member: null,
  });

  const debouncedSearch = useDebounce(query, 500);
  const {
    fetchSaleExecutiveLeads,
    fetchReportingToEmployees,
    leads,
    updateCurrentLead,
    currentLead,
    loadingLeads,
    leadInfo,
    fetchingMoreLeads,
    employees,
    getProjects,
    getRequirements,
  } = useData();

  const isMobile = useIsMobile();

  const loadMoreLeads = useCallback(async () => {
    try {
      await fetchSaleExecutiveLeads({
        id: user?._id,
        query: query,
        page: leadInfo?.page + 1 ?? 1,
        limit: 10,
        status: selectedFilter?.status,
        callData: selectedFilter?.callData,
        cycle: selectedFilter?.cycle,
        order: selectedFilter?.order,
        clientstatus: selectedFilter?.clientstatus,
        leadstatus: selectedFilter?.leadstatus,
        startDate: selectedFilter?.startDate,
        endDate: selectedFilter?.endDate,
        date: selectedFilter?.date,
        member: selectedFilter?.member,
      });
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
  const onChangeSearch = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  };
  const onChangeFilter = (filters, reset = false) => {
    //TODO:select filter logic
    console.log(filters);
    setSelectedFilter(filters);
    if (!reset) {
      fetchSaleExecutiveLeads({
        id: user?._id,
        query: query,
        page: 1,
        limit: 10,
        ...filters,
      });
    }
  };

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSaleExecutiveLeads({
        id: user?._id,
        query: query,
        page: leadInfo?.page + 1 ?? 1,
        limit: 10,
        status: selectedFilter?.status,
        callData: selectedFilter?.callData,
        cycle: selectedFilter?.cycle,
        order: selectedFilter?.order,
        clientstatus: selectedFilter?.clientstatus,
        leadstatus: selectedFilter?.leadstatus,
        startDate: selectedFilter?.startDate,
        endDate: selectedFilter?.endDate,
        date: selectedFilter?.date,
        member: selectedFilter?.member,
      });
      fetchReportingToEmployees(user?.reportingTo?._id, "sales");
      getProjects();
      getRequirements();
    }
  }, [user, loading]);

  useEffect(() => {
    if (debouncedSearch !== "") {
      fetchSaleExecutiveLeads({
        id: user?._id,
        query: query,
        page: 1,
        limit: 10,
        status: selectedFilter?.status,
        callData: selectedFilter?.callData,
        cycle: selectedFilter?.cycle,
        order: selectedFilter?.order,
        clientstatus: selectedFilter?.clientstatus,
        leadstatus: selectedFilter?.leadstatus,
        startDate: selectedFilter?.startDate,
        endDate: selectedFilter?.endDate,
        date: selectedFilter?.date,
        member: selectedFilter?.member,
      });
    }
  }, [debouncedSearch]);

  // if (loading || !user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className={styles.fullContainer}>
      {!(isMobile && currentLead) && (
        <Leaddashboardcards
          onChangeSearch={onChangeSearch}
          query={query}
          onChangeFilter={onChangeFilter}
          employees={employees}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      )}

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
