"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import styles from "../LeadsDashboardCards/leadsdashboardcards.module.css";
import { FilterCard } from "../FilterCard/Filtercard";
import useBodyScrollLock from "../useBodyScrollLock";

const FollowupTopCard = () => {
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

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>
          <FiSearch size={20} />
        </button>
      </div>

      <div className={styles.menuWrapper}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </div>

        {menuOpen && (
          <div className={styles.menuOptions}>
            <div className={styles.menuItem} onClick={toggleFilter}>
              Filter
            </div>
            <div className={styles.menuItem}>Reminders</div>
          </div>
        )}
      </div>

      {showFilter && (
        <>
          <div className={styles.overlay} onClick={toggleFilter}></div>
          <div className={styles.filterSlideIn}>
            <FilterCard />
          </div>
        </>
      )}
    </div>
  );
};

export default FollowupTopCard;
