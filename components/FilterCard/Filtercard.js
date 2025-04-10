"use client";
import React, { useState } from 'react';
import styles from "./filtercard.module.css";

const FilterCard = () => {
  const filters = {
    "Visits": ['total', 'visit-done', 'revisit-done', 'booking-done', 'visit-pending', 'revisit-pending'],
    "Call Status": ['Call Done', 'Call Not Received', 'Call Cancelled', 'Call Busy', 'Not Reachable'],
    "Client Status": ['interested', 'not-interested'],
    "Lead Status": ['hot', 'warm', 'cold', 'just-curious'],
    "Cycle Status": [1, 2, 3, 4, 5],
    "Order": ['Ascending', 'Descending']
  };

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value]
    }));
  };

  return (
    <div className={styles.filterCard}>
      <h3 className={styles.title}>Filters</h3>
      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className={styles.filterCategory}>
          <h4 className={styles.categoryTitle}>{category}</h4>
          {options.map(option => (
            <label key={option} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedFilters[category]?.includes(option) || false}
              onChange={() => handleCheckboxChange(category, option)}
              className={styles.checkbox}
            />
            {String(option).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </label>
          
          ))}
        </div>
      ))}
    </div>
  );
};

export { FilterCard };
