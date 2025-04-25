import React, { useState } from "react";
import styles from "./descriptionsection.module.css";
import Image from "next/image";

const DescriptionSection = ({ projectInfo }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [desc, setDesc] = useState(false);

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
          <div className={`${styles.descriptText}`}>
            <p
              className={styles.descriptionTextPara}
              style={{ maxHeight: desc ? null : "calc(1.6em * 6)" }}
            >
              {projectInfo?.description ?? ""}
            </p>
            <button
              className={styles.button}
              onClick={() => {
                setDesc(!desc);
              }}
            >
              Know More
            </button>
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
                src={projectInfo?.showCaseImage}
                // src="/images/Building1.jpg"
                alt="Building"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.thirdImage}>
              <Image
                src={projectInfo?.showCaseImage}
                // src="/images/Building2.jpg"
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
