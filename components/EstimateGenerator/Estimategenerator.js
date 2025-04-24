"use client";
import React, { useEffect, useState } from "react";
import styles from "./estimategenerator.module.css";
import {
  FaUser,
  FaPhoneAlt,
  FaHome,
  FaChartArea,
  FaDollarSign,
  FaBuilding,
  FaTag,
} from "react-icons/fa";
import { FaBuildingFlag } from "react-icons/fa6";
import { IoLayers } from "react-icons/io5";
import { PiSealPercentFill } from "react-icons/pi";

import CustomSelect from "../CustomSelect";

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
      <div className={styles.headerRow}>
        <button className={styles.generateBtn}>Generate PDF</button>
        <div className={styles.heading}>Estimator</div>
      </div>

      {/* <div className={styles.sections}> */}
      <div className={styles.sectionClient}>
        <div className={styles.sectionHeader}>Client Details</div>
        <div className={styles.detailsInfo}>
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
      </div>
      {/* <div className={styles.sections}> */}
        <div className={styles.remainSection}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>Project Details</div>

            <CustomSelect
              id="projects"
              label="Projects"
              icon={FaBuildingFlag}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select projects"
            />

            <CustomSelect
              id="slab"
              label="Slab"
              icon={IoLayers}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select slab"
            />

            <CustomSelect
              id="building"
              label="Bldg No."
              icon={FaBuilding}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select building"
            />

            <CustomSelect
              id="floor"
              label="Select Floor"
              icon={FaBuilding}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select floor"
            />

            <CustomSelect
              id="number"
              label="Select Number"
              icon={FaBuilding}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select number"
            />

            <CustomSelect
              id="flatNumber"
              label="Select Flat Number"
              icon={FaBuilding}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Select Flat No."
            />

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

            <CustomSelect
              id="stampDuty"
              label="Select Stamp Duty (%)"
              icon={PiSealPercentFill}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="Stamp duty %"
            />

            <CustomSelect
              id="coupon"
              label="Select Coupon"
              icon={FaTag}
              options={projectOptions}
              value={selectedProjects}
              onChange={setSelectedProjects}
              placeholder="coupon"
            />
          </div>

          <div className={`${styles.section} ${styles.sectionStacked}`}>
          <div className={styles.innerSection}>
            <div className={styles.sectionHeader}>Estimated Values</div>
            <div className={styles.estimatedDetails}>
              <div className={styles.estimatedRow}>
                <span>Agreement Value</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>GST Amount</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>Stamp Duty Amount</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>Registration Amount</span>
                <span>30000</span>
              </div>
            </div>
          </div>

          <div className={styles.innerSection}>
            <div className={styles.sectionHeader}>Payable Amount Details</div>
            <div className={styles.estimatedDetails}>
              <div className={styles.estimatedRow}>
                <span>Booking Amount</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>GST Amount</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>StampDuty + Registration</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>Total Payable</span>
                <span>0</span>
              </div>
              <div className={styles.estimatedRow}>
                <span>Total Previous Percentage</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default Estimategenerator;
