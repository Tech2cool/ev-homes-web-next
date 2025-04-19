import React from "react";
import styles from "./descriptionsection.module.css";
import Image from "next/image";
import Switch from "../Switch";

const DescriptionSection = () => {
  return (
    <section id="description" className={styles.sectionWrapper}>
      <div className={styles.bgWrapper}>
        <Image
          src="/images/buildingforDescription.jpg"
          alt="Description Background"
          fill
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.wholeContainer}>
        <div className={styles.descriptionContainer}>
          <h2>Description</h2>
          <div className={styles.descriptText}>
            Welcome to EV 23 Malibu West 🌴✨ <br />
            Ultra-Luxury Living Inspired by Malibu, California
            <br />
            <br />
            Developed by EV Homes Construction Pvt Ltd, a name synonymous with
            quality and innovation, EV 23 Malibu West is an ultra-luxury
            residential project located in Kopar Khairane Sector 23, Navi
            Mumbai. Inspired by the opulent beachfront lifestyle of Malibu,
            California, this development offers a range of 2 BHK and 3 BHK
            sea-facing residences designed to provide both comfort and elegance.
            Each home is thoughtfully crafted to offer breathtaking sea views
            and a peaceful living experience.
            <br />
            <br />
            🌟 World-Class Amenities At EV 23 Malibu West, we believe in
            offering more than just a home – it’s a lifestyle. The project
            features a range of curated amenities for residents:
            <button className={styles.button}>Know More</button>
          </div>
        </div>
        <div className={styles.otherContainer}>
          <div className={styles.imageWrapper}>
          <Switch className={styles.switch}/>
            <div className={styles.firstImage}></div>
            
            <div className={styles.secondImage}>
              
            </div>
            <div className={styles.thirdImage}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
