import React from "react";
import styles from "./amenitiessection.module.css";
import Image from "next/image";

const AmenitiesSection = () => {
  return (
    <section id="amenities" className={styles.sectionWrapper}>
      <h2 className={styles.title}>Amenities</h2>

      <div className={styles.container}>
        <div className={`${styles.imageBox} ${styles.imageBox1}`}>
          <Image
            src="/images/swimming.jpg"
            alt="Swimming"
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.shineEffect}></div>
          <div className={styles.imageText}>Zuma 23</div>
          <div className={styles.imageText2}>Swimming</div>
        </div>

        <div className={styles.centerSection}>
          <div className={`${styles.imageBox} ${styles.imageBox2}`}>
            <Image
              src="/images/Hall.jpg"
              alt="Hall"
              layout="fill"
              objectFit="cover"
            />
            <div className={styles.shineEffect}></div>

            <div className={styles.imageText}>Zuma 23</div>
            <div className={styles.imageText2}>Swimming</div>
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.textLine}>
              🏊 <span className={styles.colorText}>Zuma 23</span> – An infinity
              pool with stunning sea views, perfect for relaxation.
            </div>
            <br />
            <div className={styles.textLine}>
              🌌<span className={styles.colorText}>Crystal Venue 23</span> –
              Kopar Khairane’s first sky banquet hall for special events.
            </div>
            <br />
            <div className={styles.textLine}>
              🛝 <span className={styles.colorText}>23 Play Land</span> – A
              vibrant, specially designed kids’ play area.
            </div>
          </div>
        </div>

        <div className={`${styles.imageBox} ${styles.imageBox3}`}>
          <Image
            src="/images/PlayArea.jpg"
            alt="PlayAarea"
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.shineEffect}></div>

          <div className={styles.imageText}>Zuma 23</div>
          <div className={styles.imageText2}>Swimming</div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.imageBox} ${styles.imageBox4}`}>
          <Image
            src="/images/Gym.jpg"
            alt="Gym"
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.shineEffect}></div>

          <div className={styles.imageText}>Zuma 23</div>
          <div className={styles.imageText2}>Swimming</div>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.textWrapper2}>
            <div className={styles.textLine}>
              🏋️ <span className={styles.colorText}> Titan 23</span> – A fully
              equipped gym for your health goals.
            </div>
            <br />
            <div className={styles.textLine}>
              🧘‍♀️<span className={styles.colorText}> Dhyana Center 23</span> – A
              tranquil sea-facing meditation center.
            </div>
            <br />
            <div className={styles.textLine}>
              🏃‍♂️<span className={styles.colorText}> Dash 23</span> – A jogging
              track for fitness lovers.
            </div>
          </div>
          <div className={`${styles.imageBox} ${styles.imageBox5}`}>
            <Image
              src="/images/Gym.jpg"
              alt="Gym"
              layout="fill"
              objectFit="cover"
            />
            <div className={styles.shineEffect}></div>

            <div className={styles.imageText}>Zuma 23</div>
            <div className={styles.imageText2}>Swimming</div>
          </div>
        </div>

        <div className={`${styles.imageBox} ${styles.imageBox6}`}>
          <Image
            src="/images/Gym.jpg"
            alt="Gym"
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.shineEffect}></div>

          <div className={styles.imageText}>Zuma 23</div>
          <div className={styles.imageText2}>Swimming</div>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
