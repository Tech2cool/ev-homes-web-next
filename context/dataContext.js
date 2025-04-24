"use client";

import fetchAdapter from "@/adapter/fetchAdapter";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leadInfo, setleadInfo] = useState(null);
  // dashboard graph info
  const [graphInfo, setGraphInfo] = useState(null);
  // leads[]
  const [leads, setleads] = useState([]);
  // leads[] loading
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [fetchingMoreLeads, setFetchingMoreLeads] = useState(false);
  // current lead
  const [currentLead, setCurrentLead] = useState(null);
  // current lead loading
  const [loadingCurrentLead, setLoadingCurrentLead] = useState(false);
  // current task
  const [currentTask, setCurrentTask] = useState(null);
  // current task loading
  const [loadingCurrentTask, setLoadingCurrentTask] = useState(false);
  // tasks[]
  const [tasks, setTaks] = useState([]);
  // tasks[] loading
  const [loadingTask, setLoadingTask] = useState(false);

  const [currentProject, setCurrentProject] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  // graph loading
  const [loading, setLoading] = useState(false);

  // universal error
  const [error, setError] = useState("");

  // fetch leads for salesM/ salesEx
  const fetchSaleExecutiveLeads = async (id, query, page = 1, limit = 10) => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
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
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: true };
    } catch (err) {
      setError(err.message);
      setFetchingMoreLeads(false);
      setLoadingLeads(false);

      return { success: false, message: err.message };
    } finally {
      setFetchingMoreLeads(false);
      setLoadingLeads(false);
    }
  };

  // fetch leads for salesM/ salesEx
  const fetchSaleExecutiveLeadsGraph = async (id) => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting-graph/${id}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      setGraphInfo(res?.data);
      setLoading(false);

      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);

      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // fetch leads for closing manager
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

  // fetch tasks for salesM/ salesEx
  const fetchSaleExecutiveTasks = async (id, query) => {
    setLoadingTask(true);
    setError("");

    try {
      let url = `/api/task/${id}`;
      if (query) {
        url += `?query=${query}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      setTaks(res?.data ?? []);
      setLoadingTask(false);

      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoadingTask(false);

      return { success: false, message: err.message };
    } finally {
      setLoadingTask(false);
    }
  };

  // update feedback
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

  //get lead by id
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

  // utils - update current lead
  const updateCurrentLead = (lead) => {
    setCurrentLead(lead);
  };

  // utils - update current task
  const updateCurrentTask = (task) => {
    setCurrentTask(task);
  };

  //get lead by id
  const getProjectById = async (id) => {
    setLoadingProject(true);
    setError("");

    try {
      let url = `/api/ourProjects/${id}`;
      const res = await fetchAdapter(url, {
        method: "get",
      });
      console.log(res);
      setCurrentProject(res?.data);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingProject(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        fetchSaleExecutiveLeads,
        fetchTeamLeaderLeads,
        fetchSaleExecutiveLeadsGraph,
        fetchSaleExecutiveTasks,
        updateCurrentLead,
        updateCurrentTask,
        updateFeedback,
        getProjectById,
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
        loadingProject,
        currentProject,
        currentTask,
        fetchingMoreLeads,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
