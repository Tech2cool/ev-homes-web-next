import React, { useEffect, useRef, useState } from "react";
import styles from "./descriptionsection.module.css";
import Image from "next/image";

const DescriptionSection = ({ projectInfo }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [desc, setDesc] = useState(false);

  const [showClickHint, setShowClickHint] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowClickHint(true);
          setTimeout(() => setShowClickHint(false), 3000);
        }
      },
      { threshold: 0.6 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setShowClickHint(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setShowClickHint(false), 1000);
  };

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
          <h2>Discover {projectInfo?.name ?? ""}</h2>
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
          <div className={styles.contactUsWrapper}>Get In Touch Today !</div>
          <div className={styles.contactNumberWrapper}> +91 8291668777</div>
        </div>
        <div className={styles.otherContainer}>
          <div className={styles.loaderWrapper}>
            <div
              ref={loaderRef}
              className={styles.loadershape3}
              onClick={() => setShowOverlay(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {showClickHint && (
                <div className={styles.clickHint}>
                  📍 Want to know why this location is prime? Click me!
                </div>
              )}
            </div>

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
