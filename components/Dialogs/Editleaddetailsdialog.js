import React, { useEffect, useState } from "react";
import styles from "../Dialogs/assigndialog.module.css";
import style from "./editleaddetailsdialog.module.css";
import { FaUser, FaBuilding } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Select from "react-select";

const Editleaddetailsdialog = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [selectedApartments, setSelectedApartments] = useState([]);
  const [apartmentOptions, setApartmentOptions] = useState([]);

  const handleClose = () => {
    setIsClosing(true);
  };

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  useEffect(() => {
    const projectData = [
      { value: "ev23", label: "EV 23 Malibu West" },
      { value: "evheart", label: "EV Heart City" },
      { value: "ev9", label: "EV 9 Square" },
      { value: "ev10", label: "EV10 Marina Bay" },
    ];
    setProjectOptions(projectData);
  }, []);

  useEffect(() => {
    const apartmentData = [
      { value: "1", label: "1 BHK" },
      { value: "2", label: "2 BHK" },
      { value: "3", label: "3 BHK" },
      { value: "4", label: "4 BHK" },
    ];
    setApartmentOptions(apartmentData);
  }, []);

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={`${styles.dialogContainer} ${
          isClosing ? styles.slideOut : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}>
          <ImCross color="#C41E3A" />
        </button>

        <h2>Edit Lead Details</h2>

        <div className={styles.sectionHeader}>
          <FaUser className={styles.icon} />
          <span>Personal Information</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="firstName">First Name *</label>
          <div className={style.inputWrapper}>
            <FaUser className={style.inputIcon} />
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className={style.inputField}
            />
          </div>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="lastName">Last Name</label>
          <div className={style.inputWrapper}>
            <FaUser className={style.inputIcon} />
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className={style.inputField}
            />
          </div>
        </div>
        <div className={styles.sectionHeader}>
          <FaBuilding className={styles.icon} />
          <span>Project Information</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="projects">Projects</label>
          <div className={style.inputWrapper}>
            <Select
              id="projects"
              isMulti
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
        </div>

        <div className={styles.sectionHeader}>
          <MdApartment className={styles.icon} />
          <span>Apartment Preferences</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="apartmnets">Apartments</label>
          <div className={style.inputWrapper}>
            <Select
              id="apartments"
              isMulti
              options={apartmentOptions}
              value={selectedApartments}
              onChange={setSelectedApartments}
              placeholder="Select apartments..."
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
        </div>

        <div className={styles.sectionHeader}>
          <BiSolidMessageSquareEdit className={styles.icon} />
          <span>Remark</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="text">Remarks</label>
          <textarea name="text" rows="5" />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.submitButton}>Save</button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editleaddetailsdialog;
