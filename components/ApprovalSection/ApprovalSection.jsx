import React, { useState } from "react";
import styles from "./approvalsection.module.css";
import searchStyles from "@/components/MyAttendanceSections/attendancesection.module.css";
import { FiSearch, FiPlus } from "react-icons/fi";

const optionsList = [
  "All",
  "Leave",
  "WeekOff",
  "Regularization",
  "Reimbursement",
  "Asset",
];

const ApprovalSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["All"]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSelectOption = (option) => {
    setSelectedOptions((prev) => {
      if (option === "All") {
        return ["All"];
      }

      if (prev.includes("All")) {
        return [option];
      }

      if (!prev.includes(option)) {
        return [...prev, option];
      }
      return prev;
    });
    setShowDropdown(false);
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== option));
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.firstSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search...."
            className={searchStyles.searchInput}
          />
          <button className={searchStyles.searchButton}>
            <FiSearch size={18} />
          </button>
        </div>

        <div className={styles.filterSection}>
          <div className={styles.iconContainer}>
            <div onClick={toggleDropdown} className={styles.plusIcon}>
              <FiPlus size={20} />
            </div>
          </div>

          <div className={styles.optionRendering}>
            {selectedOptions.map((option) => (
              <div key={option} className={styles.options}>
                <div>{option}</div>
                <div
                  style={{
                    marginLeft: "8px",
                    cursor: "pointer",
                    color: "grey",
                  }}
                  onClick={() => handleRemoveOption(option)}
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDropdown && (
          <div className={styles.dropdown}>
            {optionsList.map((option) => {
              const isSelected = selectedOptions.includes(option);
              return (
                <div
                  key={option}
                  className={`${styles.dropdownItem} ${
                    isSelected ? styles.disabledItem : ""
                  }`}
                  onClick={() => {
                    if (!isSelected) handleSelectOption(option);
                  }}
                  style={{
                    cursor: isSelected ? "not-allowed" : "pointer",
                    opacity: isSelected ? 0.5 : 1,
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.secondSection}>
        {selectedOptions.includes("All") || selectedOptions.includes("Leave") ? (
          <div className={styles.leaveSection}>Leave container</div>
        ) : null}
        {selectedOptions.includes("All") || selectedOptions.includes("WeekOff") ? (
          <div className={styles.weekoffSection}>Week Off container</div>
        ) : null}
        {selectedOptions.includes("All") || selectedOptions.includes("Asset") ? (
          <div className={styles.assetSection}>Asset container</div>
        ) : null}
        {selectedOptions.includes("All") || selectedOptions.includes("Regularization") ? (
          <div className={styles.regularizationSection}>Regularization container</div>
        ) : null}
        {selectedOptions.includes("All") || selectedOptions.includes("Reimbursement") ? (
          <div className={styles.reimbursementSection}>Reimbursement container</div>
        ) : null}
      </div>
    </div>
  );
};

export default ApprovalSection;
