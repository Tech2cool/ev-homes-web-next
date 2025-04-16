"use client";

import fetchAdapter from "@/adapter.js/fetchAdapter";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leadInfo, setleadInfo] = useState(null);
  const [leads, setleads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const fetchSaleExecutiveLeads = async (id, page = 1, limit = 10) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchAdapter(`/api/leads-team-leader-reporting/${id}`, {
        method: "GET",
      });
      console.log(res);
      const { data, ...withoutData } = res;

      setleadInfo(withoutData);
      setleads(res?.data ?? []);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{ fetchSaleExecutiveLeads, leadInfo, leads, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
