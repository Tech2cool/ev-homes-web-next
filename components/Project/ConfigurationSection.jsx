import React from "react";
import Image from "next/image";
import styles from "./configurationsection.module.css";
import style from "./descriptionsection.module.css";

const ConfigurationSection = () => {
  return (
    <section id="configuration" className={styles.sectionWrapper}>
      <div className={style.bgWrapper}>
        <Image
          src="/images/buildingforDescription.jpg"
          alt="Description Background"
          fill
          className={style.bgImage}
          priority
        />
        <div className={style.overlay}></div>
      </div>
      <h2 className={styles.headline}>
        Configuration{" "}
        <div className={styles.buttonContainer}>
        <button className={styles.bhkButton}>
          <span>2 BHK</span>
        </button>
        <button className={styles.bhkButton}>
          <span>3 BHK</span>
        </button>
        </div>
      </h2>
    </section>
  );
};

export default ConfigurationSection;
