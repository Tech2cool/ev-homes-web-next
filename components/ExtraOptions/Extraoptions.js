'use client'
import React from "react";

import styles from "./extraoptions.module.css";
import { FaFileInvoiceDollar, FaCalendarAlt, FaBoxes,FaRegWindowRestore } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Extraoptions = () => {
  const router =useRouter();
  
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        <FaFileInvoiceDollar className={styles.icon} />
        Cost Sheet
      </button>
      <button className={styles.button}>
        <FaCalendarAlt className={styles.icon} />
        Payment Schedule
      </button>
      <button className={styles.button}>
        <FaBoxes className={styles.icon} />
        Inventory
      </button>
      <button className={styles.button} onClick={()=> router.push("./dashboard/line-up")}>
        <FaRegWindowRestore className={styles.icon} />
        Line Up
      </button>
    </div>
  );
};

export default Extraoptions;
