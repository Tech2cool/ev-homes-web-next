import React, { useEffect, useState } from "react";
import fetchAdapter from "@/adapter/fetchAdapter";
import styles from "./projectnavbar.module.css";
import { CiLocationOn } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import "../HeroSection/HeroSection.css";
import DescriptionSection from "./DescriptionSection";
import AmenitiesSection from "./AmenitiesSection";
import ConfigurationSection from "./ConfigurationSection";

const ProjectNavbar = () => {
  const [projectInfo, setProjectInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFixedLogo, setShowFixedLogo] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setAtTop(currentScrollPos === 0);

      if (currentScrollPos > prevScrollPos && currentScrollPos > 50) {
        // scrolling down
        setShowFixedLogo(true);
      } else {
        // scrolling up
        setShowFixedLogo(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchAdapter("/api/ourProjects", {
      headers: {
        "x-platform": "web",
      },
    })
      .then((data) => {
        setProjectInfo(data?.data ?? []);
      })
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  useEffect(() => {
    if (projectInfo.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === projectInfo.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [projectInfo]);

  const heroTexts = [
    {
      small: "Spacious",
      main: "Your Home Journey Begins Here!",
      sub: "Discover homes designed for modern living",
    },
    {
      small: "Elegant",
      main: "Where Luxury Meets Comfort",
      sub: "Every corner reflects timeless elegance",
    },
    {
      small: "Modern",
      main: "Designs that Inspire Living",
      sub: "Crafted with contemporary aesthetics in mind",
    },
    {
      small: "Peaceful",
      main: "Tranquility in Every Corner",
      sub: "Experience peace in every square foot",
    },
    {
      small: "Connected",
      main: "Live Closer to What Matters",
      sub: "Stay near work, family, and fun",
    },
  ];

  const currentProject = projectInfo[currentIndex];
  const fallbackImage =
    "https://cdn.evhomes.tech/f5e53c63-905e-4c26-afc0-bd508c452ab7-about-banner.jpg";
  return (
    <div className={styles.scrollableContainer}>
      <div
        className={styles.herosection}
        style={{
          background: `url("${
            currentProject?.showCaseImageLandscape || fallbackImage
          }") no-repeat center center/cover`,
          position: "relative",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className={styles.overlay}>
          <div className={styles.navbar}>
            <div className={styles.topContent}>
              <div className={styles.location}>
                <CiLocationOn className={styles.icon} />
                EV23 Malibu West, Koparkhairane
              </div>
              <div className={styles.contact}>
                <span className={styles.phone}>
                  <LuPhone className={styles.icon} />
                  +91 1234567890
                </span>
                <span className={styles.email}>
                  <MdOutlineMailOutline className={styles.icon} />
                  example@example.com
                </span>
              </div>
            </div>
            <div
              className={`${styles.logoContent} ${
                !atTop ? (showFixedLogo ? styles.show : styles.hide) : ""
              }`}
            >
              <div className={styles.logo}>
                <Image
                  className={styles.logoImage}
                  src="/images/evhomeslogo.png"
                  alt="EV Homes Logo"
                  width={250}
                  height={50}
                />
              </div>
              <ul>
                <li>Malibu West</li>
                <li onClick={() => scrollToSection("description")}>
                  Description
                </li>
                <li onClick={() => scrollToSection("amenities")}>Amenities</li>
                <li onClick={() => scrollToSection("configuration")}>
                  Configuration
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.heroText}>
            <div className={styles.smallText} key={currentIndex + "-small"}>
              {heroTexts[currentIndex % heroTexts.length].small}
            </div>
            <div className={styles.mainText} key={currentIndex + "-main"}>
              {heroTexts[currentIndex % heroTexts.length].main}
            </div>
            <div className={styles.subText} key={currentIndex + "-sub"}>
              {heroTexts[currentIndex % heroTexts.length].sub}
            </div>
          </div>
        </div>
      </div>
      <DescriptionSection />
      <AmenitiesSection />
      <ConfigurationSection />
    </div>
  );
};

export default ProjectNavbar;
