"use client";

import fetchAdapter from "@/adapter/fetchAdapter";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leadInfo, setleadInfo] = useState(null);
  // dashboard graph info
  const [graphInfo, setGraphInfo] = useState(null);
  const [leadLineGraph, setLeadLineGraph] = useState([]);
  const [taskReminders, setTaskReminders] = useState([]);
  const [employees, setEmployees] = useState([]);
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
  const fetchReportingToEmployees = async (id, dept) => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/employee-reporting/${id}`;
      if (dept) {
        url += `?dept=${dept}`;
      }
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      console.log(res);
      setEmployees(res?.data);
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

  // fetch leads for salesM/ salesEx
  const fetchSaleExecutiveLeads = async ({
    id,
    query = "",
    page = 1,
    limit = 10,
    status = null,
    callData = null,
    cycle = null,
    order = null,
    clientstatus = null,
    leadstatus = null,
    startDate = null,
    endDate = null,
    date = null,
    member = null,
  }) => {
    if (page === 1) {
      setLoadingLeads(true);
    } else {
      setFetchingMoreLeads(true);
    }
    setError("");

    try {
      let url = `/api/leads-team-leader-reporting/${id}?query=${query}&page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (callData) {
        url += `&callData=${callData}`;
      }
      if (cycle) {
        url += `&cycle=${cycle}`;
      }
      if (order) {
        url += `&order=${order}`;
      }
      if (clientstatus) {
        url += `&clientstatus=${clientstatus}`;
      }
      if (leadstatus) {
        url += `&leadstatus=${leadstatus}`;
      }
      if (startDate) {
        url += `&startDate=${startDate}`;
      }
      if (endDate) {
        url += `&endDate=${endDate}`;
      }
      if (date) {
        url += `&date=${date}`;
      }
      if (member) {
        url += `&member=${member}`;
      }
      console.log(url);
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
      console.log(res);
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

  // fetch leads for salesM/ salesEx
  const fetchSaleExecutiveLeadsLineGraph = async (id, interval = "monthly") => {
    setLoading(true);
    setError("");

    try {
      let url = `/api/lead-count?teamLeader=${id}&interval=${interval}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });
      console.log(res);
      setLeadLineGraph(res?.data);
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
  // fetch tasks for salesM/ salesEx
  const fetchSaleExecutiveTaskReminders = async (id) => {
    setLoadingTask(true);
    setError("");

    try {
      let url = `/api/task-reminder-all/${id}`;
      const res = await fetchAdapter(url, {
        method: "GET",
      });

      setTaskReminders(res?.data ?? []);
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

  //get lead by id
  const getTaskById = async (id) => {
    setLoadingTask(true);
    setError("");

    try {
      let url = `/api/task-by-id/${id}`;
      const res = await fetchAdapter(url, {
        method: "get",
      });

      setCurrentTask(res?.data);
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoadingTask(false);
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
        fetchSaleExecutiveLeadsLineGraph,
        fetchSaleExecutiveTaskReminders,
        fetchReportingToEmployees,
        getTaskById,
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
        leadLineGraph,
        taskReminders,
        employees,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
