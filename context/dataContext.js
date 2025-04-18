"use client";

import fetchAdapter from "@/adapter/fetchAdapter";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leadInfo, setleadInfo] = useState(null);
  const [graphInfo, setGraphInfo] = useState(null);
  const [leads, setleads] = useState([]);
  const [currentLead, setCurrentLead] = useState(null);
  const [tasks, setTaks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);
  const [error, setError] = useState("");

  const fetchSaleExecutiveLeads = async (id, query, page = 1, limit = 10) => {
    setLoadingLeads(true);
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting/${id}?query=${query}&page=${page}&limit=${limit}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res;

      setleadInfo(withoutData);
      if (page > 1) {
        setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchSaleExecutiveLeadsGraph = async (id) => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting-graph/${id}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      setGraphInfo(res?.data);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamLeaderLeads = async (id, query, page = 1, limit = 10) => {
    setLoadingLeads(true);
    setError("");

    try {
      let url = `/api/leads-team-leader/${id}?query=${query}&page=${page}&limit=${limit}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      const { data, ...withoutData } = res;

      setleadInfo(withoutData);
      if (page > 1) {
        setleads((prev) => [...prev, ...res?.data]);
      } else {
        setleads(res?.data ?? []);
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchSaleExecutiveTasks = async (id, query) => {
    setLoadingTask(true);
    setError("");

    try {
      let url = `/task/${id}`;
      if (query) {
        url += `?query=${query}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      setTaks(res?.data ?? []);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingTask(false);
    }
  };

  const updateFeedback = async (data) => {
    setLoadingTask(true);
    setError("");

    try {
      let url = `/api/update-feedback`;
      const res = await fetchAdapter(url, {
        method: "POST",
        body: JSON.stringify(data),
      });

      // setTaks(res?.data ?? []);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingTask(false);
    }
  };

  const getLeadById = async (id) => {
    setLoadingLeads(true);
    setError("");

    try {
      let url = `/api/lead/${id}`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setCurrentLead(res?.data);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingLeads(false);
    }
  };

  const updateCurrentLead = (lead) => {
    setCurrentLead(lead);
  };

  return (
    <DataContext.Provider
      value={{
        fetchSaleExecutiveLeads,
        fetchTeamLeaderLeads,
        fetchSaleExecutiveLeadsGraph,
        fetchSaleExecutiveTasks,
        updateCurrentLead,
        updateFeedback,
        getLeadById,
        loadingLeads,
        loadingTask,
        graphInfo,
        leadInfo,
        loading,
        tasks,
        leads,
        currentLead,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
