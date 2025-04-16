"use client";

import fetchAdapter from "@/adapter.js/fetchAdapter";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leadInfo, setleadInfo] = useState(null);
  const [leads, setleads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

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

  return (
    <DataContext.Provider
      value={{
        fetchSaleExecutiveLeads,
        leadInfo,
        leads,
        loading,
        loadingLeads,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
