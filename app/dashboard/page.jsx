"use client";

import Leadcards from "@/components/LeadCards/Leadcards";
import Linegraphcard from "@/components/Graph/Linegraphcard";
import Piegraphcard from "@/components/Graph/Piegraphcard";
import styles from "./homepage.module.css";
import React, { useEffect, useState } from "react";
import Extraoptions from "@/components/ExtraOptions/Extraoptions";
import Taskcards from "@/components/TaskCards/Taskcards";
import Remindercard from "@/components/ReminderCard/Remindercard";
import { useData } from "@/context/dataContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation"; // for redirection

const Dashboard = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const [interval, setInterval] = useState("monthly");
  const {
    fetchSaleExecutiveLeads,
    fetchSaleExecutiveLeadsGraph,
    fetchSaleExecutiveTasks,
    fetchSaleExecutiveLeadsLineGraph,
    leadInfo,
    graphInfo,
    tasks,
    leadLineGraph,
    taskReminders,
    fetchSaleExecutiveTaskReminders,
  } = useData();

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSaleExecutiveLeads(user?._id, 1, 10);
      fetchSaleExecutiveLeadsGraph(user?._id);
      fetchSaleExecutiveTasks(user?._id);
      fetchSaleExecutiveLeadsLineGraph(user?.reportingTo?._id, interval);
      fetchSaleExecutiveTaskReminders(user?._id);
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  return (
    <div>
      <Leadcards leadInfo={leadInfo} />
      <div className={styles.lineTaskContainer}>
        <Linegraphcard
          data={leadLineGraph}
          interval={interval}
          onTapFilter={(v) => {
            console.log(v);
            setInterval(v);
            fetchSaleExecutiveLeadsLineGraph(user?.reportingTo?._id, v);
          }}
        />
        <Taskcards tasks={tasks} />
        <div className={styles.display}>
          <Extraoptions />
        </div>
      </div>
      <div className={styles.ReminPieContainer}>
        <Remindercard reminders={taskReminders} />
        <div className={styles.displaymobile}>
          <Extraoptions />
        </div>
        {/* leads to visit 1 - desktop */}
        <div className={styles.display}>
          <Piegraphcard
            Healine="Lead to Visit 1"
            percentage={`${(
              ((graphInfo?.visitCount ?? 0) * 100) /
              (graphInfo?.leadCount ?? 0)
            ).toFixed(1)}%`}
            status="Visits"
            lableone="Leads"
            labletwo="Visits 1"
            valueone={graphInfo?.leadCount ?? 0}
            valuetwo={graphInfo?.visitCount ?? 0}
            colors={["#4F959D", "#98D2C0"]}
            data={[
              { name: "leads", value: graphInfo?.leadCount },
              { name: "Visit 1", value: graphInfo?.visitCount },
            ]}
          />
        </div>
        {/* visit 1 to booking - desktop */}
        <div className={styles.display}>
          <Piegraphcard
            Healine="Visit 1 to Booking"
            percentage={`${(
              ((graphInfo?.bookingCpCount ?? 0) * 100) /
              (graphInfo?.visitCount ?? 0)
            ).toFixed(1)}%`}
            status="Visits"
            lableone="Visits 1 "
            labletwo="Booking"
            valueone={graphInfo?.visitCount ?? 0}
            valuetwo={graphInfo?.bookingCpCount ?? 0}
            colors={["#7469B6", "#E1AFD1"]}
            data={[
              { name: "Booking", value: graphInfo?.bookingCpCount },
              { name: "Visit 1", value: graphInfo?.visitCount },
            ]}
          />
        </div>
        {/* visit 2 to booking - desktop */}
        <div className={styles.display}>
          <Piegraphcard
            Healine="Visit 2 to Booking"
            percentage={`${(
              ((graphInfo?.bookingWalkinCount ?? 0) * 100) /
              (graphInfo?.visit2Count ?? 0)
            ).toFixed(1)}%`}
            status="Booking"
            lableone="Visits 2"
            labletwo="Booking"
            valueone={graphInfo?.visit2Count ?? 0}
            valuetwo={graphInfo?.bookingWalkinCount ?? 0}
            colors={["#824D74", "#FDAF7B"]}
            data={[
              { name: "Booking", value: graphInfo?.bookingWalkinCount },
              { name: "Visit 2", value: graphInfo?.visit2Count },
            ]}
          />
        </div>
        {/* Leads to booking - desktop */}
        <div className={styles.display}>
          <Piegraphcard
            Healine="Lead to Booking"
            percentage={`${(
              ((graphInfo?.bookingCount ?? 0) * 100) /
              (graphInfo?.leadCount ?? 0)
            ).toFixed(1)}%`}
            status="Booking"
            lableone="Leads"
            labletwo="Booking"
            valueone={graphInfo?.leadCount ?? 0}
            valuetwo={graphInfo?.bookingCount ?? 0}
            colors={["#7EACB5", "#C96868"]}
            data={[
              { name: "Booking", value: graphInfo?.bookingWalkinCount },
              { name: "Leads", value: graphInfo?.leadCount },
            ]}
          />
        </div>
      </div>

      {/* this display only mobile */}
      {/* leads to visit 1 - mobile */}
      <div className={styles.displaymobile}>
        <Piegraphcard
          Healine="Lead to Visit 1"
          percentage={`${(
            ((graphInfo?.visitCount ?? 0) * 100) /
            (graphInfo?.leadCount ?? 0)
          ).toFixed(1)}%`}
          status="Visits"
          lableone="Leads"
          labletwo="Visits 1"
          valueone={graphInfo?.leadCount ?? 0}
          valuetwo={graphInfo?.visitCount ?? 0}
          colors={["#4F959D", "#98D2C0"]}
          data={[
            { name: "leads", value: graphInfo?.leadCount },
            { name: "Visit 1", value: graphInfo?.visitCount },
          ]}
        />
      </div>
      {/* Additional mobile pie charts */}
      <div className={styles.displaymobile}>
        <Piegraphcard
          Healine="Visit 1 to Booking"
          percentage={`${(
            ((graphInfo?.bookingCpCount ?? 0) * 100) /
            (graphInfo?.visitCount ?? 0)
          ).toFixed(1)}%`}
          status="Visits"
          lableone="Visits 1 "
          labletwo="Booking"
          valueone={graphInfo?.visitCount ?? 0}
          valuetwo={graphInfo?.bookingCpCount ?? 0}
          colors={["#7469B6", "#E1AFD1"]}
          data={[
            { name: "Booking", value: graphInfo?.bookingCpCount },
            { name: "Visit 1", value: graphInfo?.visitCount },
          ]}
        />
      </div>
      <div className={styles.displaymobile}>
        <Piegraphcard
          Healine="Visit 2 to Booking"
          percentage={`${(
            ((graphInfo?.bookingWalkinCount ?? 0) * 100) /
            (graphInfo?.visit2Count ?? 0)
          ).toFixed(1)}%`}
          status="Booking"
          lableone="Visits 2"
          labletwo="Booking"
          valueone={graphInfo?.visit2Count ?? 0}
          valuetwo={graphInfo?.bookingWalkinCount ?? 0}
          colors={["#824D74", "#FDAF7B"]}
          data={[
            { name: "Booking", value: graphInfo?.bookingWalkinCount },
            { name: "Visit 2", value: graphInfo?.visit2Count },
          ]}
        />
      </div>
      <div className={styles.displaymobile}>
        <Piegraphcard
          Healine="Lead to Booking"
          percentage={`${(
            ((graphInfo?.bookingCount ?? 0) * 100) /
            (graphInfo?.leadCount ?? 0)
          ).toFixed(1)}%`}
          status="Booking"
          lableone="Leads"
          labletwo="Booking"
          valueone={graphInfo?.leadCount ?? 0}
          valuetwo={graphInfo?.bookingCount ?? 0}
          colors={["#7EACB5", "#C96868"]}
          data={[
            { name: "Booking", value: graphInfo?.bookingWalkinCount },
            { name: "Leads", value: graphInfo?.leadCount },
          ]}
        />
      </div>

      {/* this display only desktop */}
      <div className={styles.displaydesktop}>
        <Piegraphcard
          Healine="Lead to Visit 1"
          percentage={`${(
            ((graphInfo?.visitCount ?? 0) * 100) /
            (graphInfo?.leadCount ?? 0)
          ).toFixed(1)}%`}
          status="Visits"
          lableone="Leads"
          labletwo="Visits 1"
          valueone={graphInfo?.leadCount ?? 0}
          valuetwo={graphInfo?.visitCount ?? 0}
          colors={["#4F959D", "#98D2C0"]}
          data={[
            { name: "leads", value: graphInfo?.leadCount },
            { name: "Visit 1", value: graphInfo?.visitCount },
          ]}
        />
      </div>
      <div className={styles.displaydesktop}>
        <Piegraphcard
          Healine="Visit 1 to Booking"
          percentage={`${(
            ((graphInfo?.bookingCpCount ?? 0) * 100) /
            (graphInfo?.visitCount ?? 0)
          ).toFixed(1)}%`}
          status="Visits"
          lableone="Visits 1 "
          labletwo="Booking"
          valueone={graphInfo?.visitCount ?? 0}
          valuetwo={graphInfo?.bookingCpCount ?? 0}
          colors={["#7469B6", "#E1AFD1"]}
        />
        <Piegraphcard
          Healine="Visit 2 to Booking"
          percentage={`${(
            ((graphInfo?.bookingWalkinCount ?? 0) * 100) /
            (graphInfo?.visit2Count ?? 0)
          ).toFixed(1)}%`}
          status="Booking"
          lableone="Visits 2"
          labletwo="Booking"
          valueone={graphInfo?.visit2Count ?? 0}
          valuetwo={graphInfo?.bookingWalkinCount ?? 0}
          colors={["#824D74", "#FDAF7B"]}
        />
        <Piegraphcard
          Healine="Lead to Booking"
          percentage={`${(
            ((graphInfo?.bookingCount ?? 0) * 100) /
            (graphInfo?.leadCount ?? 0)
          ).toFixed(1)}%`}
          status="Booking"
          lableone="Leads"
          labletwo="Booking"
          valueone={graphInfo?.leadCount ?? 0}
          valuetwo={graphInfo?.bookingCount ?? 0}
          colors={["#C96868", "#7EACB5"]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
