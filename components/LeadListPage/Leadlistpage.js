"use client";
import React, { useCallback, useRef, useState } from "react";
import styles from "./leadlistpage.module.css";
import { dateFormatOnly } from "@/hooks/useDateFormat";
import { useData } from "@/context/dataContext";
import { useUser } from "@/context/UserContext";
import { capitalizeString } from "@/hooks/useString";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

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
          {lead?.firstName?.charAt(0)?.toUpperCase()}
        </div>
        <div className={styles.clientDetails}>
          <h4>
            {lead?.firstName ?? ""} {lead?.lastName ?? ""}
          </h4>
          <p className={styles.phone}>
            {lead?.countryCode ?? "91"} {lead?.phoneNumber}
          </p>
        </div>
      </div>
      <div className={styles.leadMeta}>
        <p>
          <strong>Assign Date:</strong> {dateFormatOnly(lead?.cycle?.startDate)}
        </p>
        <p>
          <strong>
            {lead.cycle != null
              ? `${capitalizeString(lead.cycle?.stage ?? "")}`
              : "Visit"}{" "}
            Deadline:
          </strong>{" "}
          {dateFormatOnly(lead?.cycle?.validTill)}
        </p>
        {lead?.clientInterestedStatus ? (
          <p className={styles.clientStatus}>{lead?.clientInterestedStatus}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Leadlistpage = ({ onLeadClick, isLoading }) => {
  const { user } = useUser();

  const { fetchSaleExecutiveLeads, leadInfo, leads, loadingLeads } = useData();

  const observer = useRef();

  const loadMoreLeads = useCallback(async () => {
    try {
      await fetchSaleExecutiveLeads(user?._id, "", leadInfo?.page + 1 ?? 1, 10);
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
      {isLoading
        ? [0, 1, 2, 3, 5].map((ele) => (
            <div
              key={ele}
              style={{
                paddingBottom: 10,
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Skeleton count={1} height={45} width={45} circle />
                  <div
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <Skeleton height={15} width={150} />
                    <Skeleton height={15} width={150} />
                  </div>
                </div>
                <div>
                  <Skeleton height={15} width={150} />
                  <Skeleton height={20} width={70} borderRadius={10} />
                </div>
              </SkeletonTheme>
            </div>
          ))
        : leads.map((lead, index) => {
            if (index === leads.length - 1) {
              return (
                <div ref={lastLeadRef} key={index}>
                  <LeadCard
                    key={`${lead?._id}-${index}`}
                    lead={lead}
                    onClick={onLeadClick}
                  />
                </div>
              );
            } else {
              return (
                <LeadCard
                  key={`${lead?._id}-${index}`}
                  lead={lead}
                  onClick={onLeadClick}
                />
              );
            }
          })}
      {loadingLeads ? (
        <p style={{ color: "white", textAlign: "center" }}>Loading...</p>
      ) : (
        <p style={{ color: "white", textAlign: "center" }}>No Results Found</p>
      )}
    </div>
  );
};

export default Leadlistpage;
