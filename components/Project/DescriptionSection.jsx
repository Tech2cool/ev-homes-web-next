import React, { useState } from "react";
import styles from "./descriptionsection.module.css";
import Image from "next/image";
import Switch from "../Switch";

const DescriptionSection = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOverlayClick = () => {
    setShowOverlay(false);
  };
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
          <div className={styles.loaderWrapper}>
            <div
              className={styles.loadershape3}
              onClick={() => setShowOverlay(true)}
            ></div>

            {showOverlay && (
              <div className={styles.hoverOverlay} onClick={handleOverlayClick}>
                <div
                  className={styles.textBelowLoader}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.prime}>📍 Prime Location</div>
                  <div>Situated in Kopar Khairane Sector 23</div>
                  <div>
                    , this project offers easy access to key locations such as:
                  </div>
                  <div className={styles.circleContainer}>
                    <div className={`${styles.circle} ${styles.circle1}`}>
                      <div className={styles.icon}>!</div>
                      <div className={styles.infoContainer}>
                        Local Market & D-Mart for daily essentials.
                      </div>
                    </div>
                    <div className={`${styles.circle} ${styles.circle2}`}>
                      <div className={styles.icon}>!</div>
                      <div className={styles.infoContainer}>
                        Hospitals for your healthcare needs.
                      </div>
                    </div>
                    <div className={`${styles.circle} ${styles.circle3}`}>
                      <div className={styles.icon}>!</div>
                      <div className={styles.infoContainer}>
                        Christ Academy for quality education.
                      </div>
                    </div>
                    <div className={`${styles.circle} ${styles.circle4}`}>
                      <div className={styles.icon}>!</div>
                      <div className={styles.infoContainer}>
                        {" "}
                        Kopar Khairane Railway Station for seamless
                        connectivity.
                      </div>
                    </div>
                  </div>

                  {/* <button
                    onClick={handleOverlayClick}
                    className={styles.closeButton}
                  >
                    Close
                  </button> */}
                </div>
              </div>
            )}
          </div>

          <div className={styles.imageWrapper}>
            {/* <div className={styles.firstImage}></div> */}
            <div className={styles.secondImage}>
              <Image
                src="/images/Building1.jpg"
                alt="Building"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.thirdImage}>
            <Image
                src="/images/Building2.jpg"
                alt="Building2"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
