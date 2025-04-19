import React from "react";
import Select from "react-select";
import styles from "./EstimateGenerator/estimategenerator.module.css";

const customStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    backgroundColor: "#111",
    borderColor: "transparent",
    boxShadow: "none",
    color: "#fff",
  }),
  input: (base) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#aaa",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#222",
    zIndex: 20,
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isSelected ? "#007bff" : isFocused ? "#333" : "#222",
    color: isSelected ? "#fff" : "#fff",
    padding: "10px 12px",
    cursor: "pointer",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#fff",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "#444",
  }),
};

const CustomSelect = ({
  id,
  label,
  icon: Icon,
  options,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={styles.formControl}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputWrapper}>
        {Icon && <Icon className={styles.inputIcon} />}
        <Select
          id={id}
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          classNamePrefix="react-select"
          closeMenuOnSelect={false}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
