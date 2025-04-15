"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./linegraphcard.module.css";
import { FaFilter } from "react-icons/fa";

const data = [
  { month: "Mar", leads: 12000 },
  { month: "Apr", leads: 18000 },
  { month: "May", leads: 15000 },
  { month: "Jun", leads: 22000 },
  { month: "Jul", leads: 17000 },
  { month: "Aug", leads: 25000 },
  { month: "Sep", leads: 27000 },
  { month: "Oct", leads: 28000 },
  { month: "Nov", leads: 30000 },
];

const Linegraphcard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Total Leads</h3>
        <div className={styles.filterWrapper} ref={dropdownRef}>
          <FaFilter
            size={15}
            style={{ cursor: "pointer" }}
            onClick={() => setShowDropdown((prev) => !prev)}
          />
          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem}>Daily</div>
              <div className={styles.dropdownItem}>Monthly</div>
              <div className={styles.dropdownItem}>Yearly</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.linegraphContainer}>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="white"/>
            <YAxis stroke="white" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="hsl(177, 100%, 50%)"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Linegraphcard;
