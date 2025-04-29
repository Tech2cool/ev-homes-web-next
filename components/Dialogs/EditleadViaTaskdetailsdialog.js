import React, { useEffect, useState } from "react";
import styles from "../Dialogs/assigndialog.module.css";
import style from "./editleaddetailsdialog.module.css";
import { FaUser, FaBuilding } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Select from "react-select";
import { useData } from "@/context/dataContext";

const EditleaddetailsViaTaskdialog = ({
  onClose,
  onClickSave = (v = {}) => {},
  lead,
}) => {
  const { currentLead, projects, requirements } = useData();

  const [isClosing, setIsClosing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [remark, setRemark] = useState(undefined);
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
    setFirstName(lead?.firstName);
    setLastName(lead?.lastName);

    // projects
    let projs = projects.map((ele) => ({ value: ele?._id, label: ele?.name }));
    let selProjs = lead?.project?.map((ele) => ({
      value: ele?._id,
      label: ele?.name,
    }));

    setProjectOptions(projs);
    setSelectedProjects(selProjs);

    // requirements
    let reqs = requirements?.map((ele) => ({ value: ele, label: ele }));
    let selReqs = lead?.requirement?.map((ele) => ({
      value: ele,
      label: ele,
    }));

    setApartmentOptions(reqs);
    setSelectedApartments(selReqs);
  }, [lead]);

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

        <div className={style.sectionHeader}>
          <FaUser className={styles.icon} />
          <span>Personal Information</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="firstName">
            First Name <span style={{ color: "red" }}>*</span>
          </label>
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
        <div className={style.sectionHeader}>
          <FaBuilding className={styles.icon} />
          <span>Project Information</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="projects">
            Projects <span style={{ color: "red" }}>*</span>
          </label>
          <div className={style.inputWrapper}>
            <Select
              id="projects"
              isMulti
              options={projectOptions}
              value={selectedProjects}
              defaultValue={selectedProjects}
              onChange={(val, meta) => {
                setSelectedProjects(val);
              }}
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

        <div className={style.sectionHeader}>
          <MdApartment className={styles.icon} />
          <span>Requirements</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="apartmnets">
            Requirements <span style={{ color: "red" }}>*</span>
          </label>
          <div className={style.inputWrapper}>
            <Select
              id="requirements"
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
                  // width: "95%",
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          </div>
        </div>

        <div className={style.sectionHeader}>
          <BiSolidMessageSquareEdit className={styles.icon} />
          <span>Remark</span>
        </div>

        <div className={styles.formControl}>
          <label htmlFor="text">Remarks</label>
          <textarea
            name="text"
            rows="5"
            onChange={(e) => {
              setRemark(e.target.value);
            }}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.submitButton}
            onClick={() => {
              let projs = selectedProjects.map((ele) => ele.value);
              let reqs = selectedApartments.map((ele) => ele.value);
              onClickSave({
                firstName: firstName,
                lastName: lastName,
                project: projs,
                requirement: reqs,
                remark: remark,
              });
            }}
          >
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editleaddetailsdialog;
