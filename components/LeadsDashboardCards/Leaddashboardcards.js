"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import styles from "./leadsdashboardcards.module.css";
import { FilterCard } from "../FilterCard/Filtercard";
import useBodyScrollLock from "../useBodyScrollLock";
import { useData } from "@/context/dataContext";
import useDebounce from "@/hooks/useDebounce";
import { useUser } from "@/context/UserContext";

const Leaddashboardcards = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const containerRef = useRef(null);
  const { user } = useUser();

  const { fetchSaleExecutiveLeads } = useData();
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce(query, 500);

  const isAnyFilterOpen = showFilter;
  useBodyScrollLock(isAnyFilterOpen);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleFilter = () => setShowFilter((prev) => !prev);
  const handleInput = (e) => {
    setQuery(e.target.value);
  };

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

  useEffect(() => {
    if (debouncedSearch !== "") {
      fetchSaleExecutiveLeads(user?._id, query, 1, 10);
    }
  }, [debouncedSearch]);

  return (
    <div className={styles.container} ref={containerRef}>
      <h2 className={styles.title}>Dashboard</h2>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={query}
          onChange={handleInput}
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
            <FilterCard />
          </div>
        </>
      )}
    </div>
  );
};

export default Leaddashboardcards;
