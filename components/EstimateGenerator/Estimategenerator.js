"use client";
import React, { useEffect, useState } from "react";
import styles from "./estimategenerator.module.css";
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaChartArea,
  FaDollarSign,
} from "react-icons/fa";
import Select from "react-select";

const Estimategenerator = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);

  useEffect(() => {
    const projectData = [
      { value: "ev23", label: "EV 23 Malibu West" },
      { value: "evheart", label: "EV Heart City" },
      { value: "ev9", label: "EV 9 Square" },
      { value: "ev10", label: "EV10 Marina Bay" },
    ];
    setProjectOptions(projectData);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Estimator</div>
      <div className={styles.sections}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Client Details</div>
          <div className={styles.formControl}>
            <label htmlFor="customerName">Customer Name </label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="phoneNumber">Phone Number </label>
            <div className={styles.inputWrapper}>
              <FaPhoneAlt className={styles.inputIcon} />
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className={styles.inputField}
              />
            </div>
          </div>

          <div className={styles.formControl}>
            <label htmlFor="address">Address </label>
            <div className={styles.inputWrapper}>
              <FaHome className={styles.inputIcon} />
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className={styles.inputField}
              />
            </div>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>Project Details</div>

          {/* <div className={styles.formControl}>
            <label htmlFor="projects">Projects</label>
            <div className={styles.inputWrapper}>
              <Select
                id="projects"
                options={projectOptions}
                value={selectedProjects}
                onChange={setSelectedProjects}
                placeholder="Select projects..."
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    borderColor: "#ccc",
                    color: "black",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#666",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  option: (base, { isSelected, isFocused }) => ({
                    ...base,
                    color: "black",
                    backgroundColor: isSelected
                      ? "#e6f3ff"
                      : isFocused
                      ? "#f0f0f0"
                      : "white",
                    padding: "10px 12px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          </div> */}

          {/* <div className={styles.formControl}>
            <label htmlFor="projects">Slab</label>
            <div className={styles.inputWrapper}>
              <Select
                id="projects"
                options={projectOptions}
                value={selectedProjects}
                onChange={setSelectedProjects}
                placeholder="Select projects..."
                classNamePrefix="react-select"
                closeMenuOnSelect={false}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "40px",
                    borderColor: "#ccc",
                    color: "black",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#666",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "black",
                  }),
                  option: (base, { isSelected, isFocused }) => ({
                    ...base,
                    color: "black",
                    backgroundColor: isSelected
                      ? "#e6f3ff"
                      : isFocused
                      ? "#f0f0f0"
                      : "white",
                    padding: "10px 12px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          </div> */}
          <div className={styles.formControl}>
            <label htmlFor="address">Carpet Area </label>
            <div className={styles.inputWrapper}>
              <FaChartArea className={styles.inputIcon} />
              <input
                readOnly
                id="carpetArea"
                value={address}
                placeholder="Carpet Area"
                className={styles.inputField}
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="address">Configuration</label>
            <div className={styles.inputWrapper}>
              <FaChartArea className={styles.inputIcon} />
              <input
                readOnly
                id="configuration"
                value={address}
                placeholder="Configuration"
                className={styles.inputField}
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="address">All Inclusive Value</label>
            <div className={styles.inputWrapper}>
              <FaDollarSign className={styles.inputIcon} />
              <input
                readOnly
                id="allInclusiveValue"
                value={address}
                placeholder="Value"
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.section} ${styles.sectionStacked}`}>
          <div className={styles.innerSection}>Estimated Values</div>
          <div className={styles.innerSection}>Payable Amount Details</div>
        </div>
      </div>
    </div>
  );
};

export default Estimategenerator;
