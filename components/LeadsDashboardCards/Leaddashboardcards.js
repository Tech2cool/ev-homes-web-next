"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import styles from "./leadsdashboardcards.module.css";
import { FilterCard } from "../FilterCard/Filtercard";
import useBodyScrollLock from "../useBodyScrollLock";
import MyHoverCard from "../MyHoverCard/MyHoverCard";

const Leaddashboardcards = ({
  onChangeSearch = (e) => {},
  onChangeFilter = (f, r = false) => {},
  query,
  employees,
  selectedFilter,
  setSelectedFilter,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const containerRef = useRef(null);

  const isAnyFilterOpen = showFilter;
  useBodyScrollLock(isAnyFilterOpen);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.title}>Dashboard</h2>
      <div
        style={{
          display: "flex",
          marginRight: "auto",
          marginLeft: 10,
        }}
      >
        {Object.entries(selectedFilter)
          .filter(([key, value]) => value != null && value !== "")
          .map(([key, value], index) => (
            <div key={key} style={{ marginLeft: 10 }}>
              <MyHoverCard
                title={value}
                onTap={() => {
                  const updatedFilter = { ...selectedFilter, [key]: null };
                  setSelectedFilter(updatedFilter);
                  onChangeFilter(updatedFilter);
                }}
              />
            </div>
          ))}
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={query}
          onChange={onChangeSearch}
        />
        <button className={styles.searchButton}>
          <FiSearch size={18} />
        </button>
      </div>

      <div className={styles.menuWrapper}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </div>

        {menuOpen && (
          <div className={styles.menuOptions}>
            <div className={styles.menuItem} onClick={toggleFilter}>
              Filter
            </div>

            <div className={styles.menuItem}>Multiselect</div>
          </div>
        )}
      </div>

      {showFilter && (
        <>
          <div className={styles.overlay} onClick={toggleFilter}></div>
          <div className={styles.filterSlideIn}>
            <FilterCard
              onChangeFilter={onChangeFilter}
              toggleFilter={toggleFilter}
              employees={employees}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Leaddashboardcards;
