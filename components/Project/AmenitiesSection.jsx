import React from "react";
import styles from "./amenitiessection.module.css";
import Image from "next/image";

const AmenitiesSection = ({ projectInfo }) => {
  const amenities = projectInfo.amenities ?? [];
  // Group amenities into arrays of 3
  const grouped = [];
  for (let i = 0; i < amenities.length; i += 3) {
    grouped.push(amenities.slice(i, i + 3));
  }
  // grouped.map((group, index) => {
  //   const [item1, item2, item3] = group;
  return (
    <section id="amenities" className={styles.sectionWrapper}>
      <h2 className={styles.title}>Amenities</h2>
      {grouped.map((grp, index) => {
        const [item1, item2, item3] = grp;
        const grp1 = grp.length;
        if (index % 2 === 0) {
          if (grp1 === 1) {
            return (
              <div className={styles.container} key={index}>
                <div className={styles.centerSection}>
                  <div className={`${styles.imageBox} ${styles.imageBox2}`}>
                    <Image
                      src={item1?.image}
                      alt={item1?.name}
                      layout="fill"
                      objectFit="cover"
                      // width={100}
                    />
                    <div className={styles.shineEffect}></div>

                    <div className={styles.imageText}>
                      {projectInfo.shortCode}
                    </div>
                    <div className={styles.imageText2}>{item1?.name}</div>
                  </div>
                  <div className={styles.textWrapper}>
                    <div className={styles.textLine}>
                      🏊 <span className={styles.colorText}>Zuma 23</span> – An
                      infinity pool with stunning sea views, perfect for
                      relaxation.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🌌
                      <span className={styles.colorText}>
                        Crystal Venue 23
                      </span>{" "}
                      – Kopar Khairane’s first sky banquet hall for special
                      events.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🛝 <span className={styles.colorText}>23 Play Land</span> –
                      A vibrant, specially designed kids’ play area.
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (grp1 === 2) {
            return (
              <div className={styles.container} key={index}>
                <div className={`${styles.imageBox} ${styles.imageBox1}`}>
                  <Image
                    src={item1?.image}
                    alt={item1?.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.shineEffect}></div>
                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item1?.name}</div>
                </div>

                <div className={styles.centerSection}>
                  <div
                    className={`${styles.imageBox} ${styles.imageBox2}`}
                  ></div>
                  <div className={styles.textWrapper}>
                    <div className={styles.textLine}>
                      🏊 <span className={styles.colorText}>Zuma 23</span> – An
                      infinity pool with stunning sea views, perfect for
                      relaxation.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🌌
                      <span className={styles.colorText}>
                        Crystal Venue 23
                      </span>{" "}
                      – Kopar Khairane’s first sky banquet hall for special
                      events.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🛝 <span className={styles.colorText}>23 Play Land</span> –
                      A vibrant, specially designed kids’ play area.
                    </div>
                  </div>
                </div>

                <div className={`${styles.imageBox} ${styles.imageBox3}`}>
                  <Image
                    src={item3?.image}
                    alt={item3?.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.shineEffect}></div>

                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item3?.name}</div>
                </div>
              </div>
            );
          }
          return (
            <div className={styles.container} key={index}>
              <div className={`${styles.imageBox} ${styles.imageBox1}`}>
                <Image
                  src={item1?.image}
                  alt={item1?.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.shineEffect}></div>
                <div className={styles.imageText}>{projectInfo.shortCode}</div>
                <div className={styles.imageText2}>{item1?.name}</div>
              </div>

              <div className={styles.centerSection}>
                <div className={`${styles.imageBox} ${styles.imageBox2}`}>
                  <Image
                    src={item2?.image}
                    alt={item2?.name}
                    layout="fill"
                    objectFit="cover"
                    // width={100}
                  />
                  <div className={styles.shineEffect}></div>

                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item2?.name}</div>
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.textLine}>
                    🏊 <span className={styles.colorText}>Zuma 23</span> – An
                    infinity pool with stunning sea views, perfect for
                    relaxation.
                  </div>
                  <br />
                  <div className={styles.textLine}>
                    🌌<span className={styles.colorText}>Crystal Venue 23</span>{" "}
                    – Kopar Khairane’s first sky banquet hall for special
                    events.
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
                  src={item3?.image}
                  alt={item3?.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.shineEffect}></div>

                <div className={styles.imageText}>{projectInfo.shortCode}</div>
                <div className={styles.imageText2}>{item3?.name}</div>
              </div>
            </div>
          );
        } else {
          if (grp1 === 1) {
            return (
              <div className={styles.container} key={index}>
                <div className={styles.centerSection}>
                  <div className={styles.textWrapper2}>
                    <div className={styles.textLine}>
                      🏋️ <span className={styles.colorText}> Titan 23</span> – A
                      fully equipped gym for your health goals.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🧘‍♀️
                      <span className={styles.colorText}>
                        {" "}
                        Dhyana Center 23
                      </span>{" "}
                      – A tranquil sea-facing meditation center.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🏃‍♂️<span className={styles.colorText}> Dash 23</span> – A
                      jogging track for fitness lovers.
                    </div>
                  </div>
                  <div className={`${styles.imageBox} ${styles.imageBox5}`}>
                    <Image
                      src={item1?.image}
                      alt={item1?.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className={styles.shineEffect}></div>

                    <div className={styles.imageText}>
                      {projectInfo.shortCode}
                    </div>
                    <div className={styles.imageText2}>{item1?.name}</div>
                  </div>
                </div>
              </div>
            );
          } else if (grp1 === 2) {
            return (
              <div className={styles.container} key={index}>
                <div className={`${styles.imageBox} ${styles.imageBox4}`}>
                  <Image
                    src={item1?.image}
                    alt={item1?.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.shineEffect}></div>

                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item1?.name}</div>
                </div>

                <div className={styles.centerSection}>
                  <div className={styles.textWrapper2}>
                    <div className={styles.textLine}>
                      🏋️ <span className={styles.colorText}> Titan 23</span> – A
                      fully equipped gym for your health goals.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🧘‍♀️
                      <span className={styles.colorText}>
                        {" "}
                        Dhyana Center 23
                      </span>{" "}
                      – A tranquil sea-facing meditation center.
                    </div>
                    <br />
                    <div className={styles.textLine}>
                      🏃‍♂️<span className={styles.colorText}> Dash 23</span> – A
                      jogging track for fitness lovers.
                    </div>
                  </div>
                  <div
                    className={`${styles.imageBox} ${styles.imageBox5}`}
                  ></div>
                </div>

                <div className={`${styles.imageBox} ${styles.imageBox6}`}>
                  <Image
                    src={item3?.image}
                    alt={item3?.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.shineEffect}></div>

                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item3?.name}</div>
                </div>
              </div>
            );
          }
          return (
            <div className={styles.container} key={index}>
              <div className={`${styles.imageBox} ${styles.imageBox4}`}>
                <Image
                  src={item1?.image}
                  alt={item1?.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.shineEffect}></div>

                <div className={styles.imageText}>{projectInfo.shortCode}</div>
                <div className={styles.imageText2}>{item1?.name}</div>
              </div>

              <div className={styles.centerSection}>
                <div className={styles.textWrapper2}>
                  <div className={styles.textLine}>
                    🏋️ <span className={styles.colorText}> Titan 23</span> – A
                    fully equipped gym for your health goals.
                  </div>
                  <br />
                  <div className={styles.textLine}>
                    🧘‍♀️
                    <span className={styles.colorText}>
                      {" "}
                      Dhyana Center 23
                    </span>{" "}
                    – A tranquil sea-facing meditation center.
                  </div>
                  <br />
                  <div className={styles.textLine}>
                    🏃‍♂️<span className={styles.colorText}> Dash 23</span> – A
                    jogging track for fitness lovers.
                  </div>
                </div>
                <div className={`${styles.imageBox} ${styles.imageBox5}`}>
                  <Image
                    src={item2?.image}
                    alt={item2?.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.shineEffect}></div>

                  <div className={styles.imageText}>
                    {projectInfo.shortCode}
                  </div>
                  <div className={styles.imageText2}>{item2?.name}</div>
                </div>
              </div>

              <div className={`${styles.imageBox} ${styles.imageBox6}`}>
                <Image
                  src={item3?.image}
                  alt={item3?.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className={styles.shineEffect}></div>

                <div className={styles.imageText}>{projectInfo.shortCode}</div>
                <div className={styles.imageText2}>{item3?.name}</div>
              </div>
            </div>
          );
        }
      })}
      {/* <div className={styles.container}>
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
              // width={100}
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
      </div> */}
    </section>
  );

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
              // width={100}
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

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
