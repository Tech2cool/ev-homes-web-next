import React, { useState } from "react";
import Image from "next/image";
import styles from "./configurationsection.module.css";
import style from "./descriptionsection.module.css";
import CurrencyFormatter from "../CurrencyFormatter/CurrencyFormatter";

const configData = [
  {
    id: 1,
    image: "/images/Hall.jpg",
    reraId: "111111",
    carpetArea: "563 sq.ft",
    configuration: "2 BHK",
    price: "2.0",
  },
  {
    id: 2,
    image: "/images/Hall.jpg",
    reraId: "111112",
    carpetArea: "600 sq.ft",
    configuration: "3 BHK",
    price: "3.0",
  },
  {
    id: 3,
    image: "/images/Hall.jpg",
    reraId: "111113",
    carpetArea: "580 sq.ft",
    configuration: "3 BHK",
    price: "2.8",
  },
  {
    id: 4,
    image: "/images/Hall.jpg",
    reraId: "111114",
    carpetArea: "540 sq.ft",
    configuration: "3 BHK",
    price: "2.5",
  },
  {
    id: 5,
    image: "/images/Hall.jpg",
    reraId: "111114",
    carpetArea: "540 sq.ft",
    configuration: "3 BHK",
    price: "2.5",
  },
];

const ConfigurationSection = ({ projectInfo }) => {
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const configList = projectInfo?.configurations ?? [];
  const configNames =
    projectInfo?.configurations
      ?.map((ele) => ele?.configuration)
      ?.filter(Boolean) ?? [];
  // console.log(configNames);
  const setConfigs = new Set(configNames);
  const uniqueConfigNames = [...setConfigs];

  console.log(setConfigs);
  const filteredCards =
    selectedConfig === null
      ? configList
      : configList.filter((card) => card.configuration === selectedConfig);
  const handleFilterClick = (config) => {
    setSelectedConfig((prev) => (prev === config ? null : config));
  };
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
      <div className={styles.container}>
        <h2 className={styles.headline}>
          Configuration{" "}
          <div className={styles.buttonContainer}>
            {uniqueConfigNames?.map((ele) => {
              return (
                <button
                  key={ele}
                  className={`${styles.bhkButton} ${
                    selectedConfig === "2 BHK" ? styles.active : ""
                  }`}
                  onClick={() => handleFilterClick(ele)}
                >
                  <span>{ele}</span>
                </button>
              );
            })}
          </div>
        </h2>
        <div className={styles.cardContainer}>
          {filteredCards.map((card, i) => (
            <div className={styles.configCard} key={i}>
              <div
                className={styles.cardImage}
                onClick={() => setSelectedImage(card.image)}
              >
                <Image
                  src={card.image}
                  alt="Room"
                  layout="fill"
                  className={styles.innerImage}
                />
              </div>

              <div className={styles.cardContent}>
                <div>RERA ID: {card.reraId}</div>
                <div>Carpet Area: {card.carpetArea}</div>
                <div>Configuration: {card.configuration}</div>
                <div>Price: {CurrencyFormatter({ amount: card.price })}</div>
              </div>
            </div>
          ))}
          {selectedImage && (
            <div
              className={styles.previewOverlay}
              onClick={() => setSelectedImage(null)}
            >
              <div className={styles.previewContainer}>
                <Image
                  src={selectedImage}
                  alt="Preview"
                  fill
                  width="100%"
                  className={styles.previewImage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfigurationSection;
