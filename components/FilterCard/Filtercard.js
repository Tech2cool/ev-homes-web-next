"use client";
import React, { useMemo, useState } from "react";
import styles from "./filtercard.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle, IoIosRemoveCircle } from "react-icons/io";
import Dropdown from "../Dropdown/Dropdown";

const FilterCard = ({
  onChangeFilter = (filter, reset) => {},
  toggleFilter = () => {},
  employees = [],
}) => {
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

  const visitFilters = [
    "total",
    "visit-done",
    "revisit-done",
    "booking-done",
    "visit-pending",
    "revisit-pending",
  ];
  const callFilters = [
    "Call Done",
    "Call Not Received",
    "Call Cancelled",
    "Call Busy",
    "Not Reachable",
  ];
  const clientFilters = ["interested", "not-interested"];
  const leadFilters = ["hot", "warm", "cold", "just-curious"];
  const cycleFilters = [30, 15, 7, 3];
  const orderFilters = ["Ascending", "Descending"];

  const onClickReset = () => {
    setSelectedFilter({
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
    onChangeFilter(
      {
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
      },
      true
    );
  };

  const onClickSubmit = () => {
    onChangeFilter(selectedFilter, false);
    toggleFilter();
  };
  const emps = useMemo(
    () =>
      employees.map((ele) => ({
        id: ele._id,
        name: `${ele?.firstName} ${ele?.lastName}`,
      })),
    [employees]
  );
  return (
    <div className={styles.filterCard}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "space-between",
        }}
      >
        <h3 className={styles.title}>Filters</h3>
        <div style={{ marginRight: 40, marginBottom: 5 }}>
          <IoIosRemoveCircle
            style={{ marginLeft: 20 }}
            color="red"
            size={22}
            onClick={onClickReset}
          />
          <IoIosCheckmarkCircle
            style={{ marginLeft: 8 }}
            color="green"
            size={22}
            onClick={onClickSubmit}
          />
        </div>
      </div>
      {/* visit status */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Visit Status</h4>
        {visitFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.status || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, status: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      {/* call status */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Call Status</h4>
        {callFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.callData || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, callData: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      {/* client status */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Client Status</h4>
        {clientFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.clientstatus || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, clientstatus: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      {/* lead status */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Lead Status</h4>
        {leadFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.leadstatus || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, leadstatus: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      {/* cycle status */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Cycle </h4>
        {cycleFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.cycle || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, cycle: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      {/* order */}
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Sort Status</h4>
        {orderFilters.map((option) => (
          <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={option === selectedFilter?.order || false}
              onChange={() =>
                setSelectedFilter((prev) => ({ ...prev, order: option }))
              }
              className={styles.checkbox}
            />
            {String(option)
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
        ))}
      </div>
      <div className={styles.filterCategory}>
        <h4 className={styles.categoryTitle}>Team Member</h4>
        <Dropdown
          heading="Select Team"
          items={emps}
          onChange={(v) => {
            setSelectedFilter((prev) => ({ ...prev, member: v.id }));
          }}
          selectedItem={selectedFilter.member}
        />
      </div>
    </div>
  );
};

export { FilterCard };
