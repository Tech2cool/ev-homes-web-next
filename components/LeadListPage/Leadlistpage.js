"use client";
import React, { useCallback, useRef, useState } from "react";
import styles from "./leadlistpage.module.css";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import { useData } from "@/context/dataContext";

const LeadCard = ({ lead, onClick }) => {
  return (
    <div
      className={styles.leadCard}
      onClick={() => {
        onClick(lead);
      }}
    >
      <div className={styles.leadInfo}>
        <div className={styles.clientIcon}>
          {lead.firstName.charAt(0).toUpperCase()}
        </div>
        <div className={styles.clientDetails}>
          <h4>
            {lead.firstName ?? ""} {lead.lastName ?? ""}
          </h4>
          <p className={styles.phone}>
            {lead.countryCode ?? "91"} {lead.phoneNumber}
          </p>
        </div>
      </div>
      <div className={styles.leadMeta}>
        <p>
          <strong>Assign Date:</strong> {dateFormatOnly(lead.cycle?.startDate)}
        </p>
        <p>
          <strong>Revisit Deadline:</strong>{" "}
          {dateFormatOnly(lead.cycle?.validTill)}
        </p>
        <p className={styles.clientStatus}>{lead?.clientInterestedStatus}</p>
      </div>
    </div>
  );
};

const Leadlistpage = ({ onLeadClick }) => {
  const { fetchSaleExecutiveLeads, leadInfo, leads, loadingLeads } = useData();

  const observer = useRef();

  const loadMoreLeads = useCallback(async () => {
    try {
      await fetchSaleExecutiveLeads(
        "ev128-ranjana-parmar",
        "",
        leadInfo?.page + 1 ?? 1,
        10
      );
    } catch (err) {
      console.error("Error loading more leads:", err);
    }
  }, [leadInfo?.page]);

  const lastLeadRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        console.log("reach end");
        if (entries[0].isIntersecting) {
          loadMoreLeads();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMoreLeads]
  );

  return (
    <div className={styles.leadListContainer}>
      {leads.map((lead, index) => {
        if (index === leads.length - 1) {
          return (
            <div ref={lastLeadRef} key={index}>
              <LeadCard lead={lead} onClick={onLeadClick} />
            </div>
          );
        } else {
          return <LeadCard key={index} lead={lead} onClick={onLeadClick} />;
        }
      })}
      {loadingLeads ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      ) : null}
    </div>
  );
};

export default Leadlistpage;
