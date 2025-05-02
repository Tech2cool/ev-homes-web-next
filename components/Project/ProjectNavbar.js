"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./projectnavbar.module.css";
import { CiLocationOn } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { FaDownload } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiDiamondsFourDuotone } from "react-icons/pi";
import "../HeroSection/HeroSection.css";
import DescriptionSection from "./DescriptionSection";
import AmenitiesSection from "./AmenitiesSection";
import ConfigurationSection from "./ConfigurationSection";
import { FaAngleUp } from "react-icons/fa";
import Link from "next/link";
import { useData } from "@/context/dataContext";
import Checkbox from "./MenuIcon";
import { useClickOutside } from "../useClickOutside";

const ProjectNavbar = ({ projectInfo }) => {
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const { getProjectById } = useData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // const [projectInfo, setProjectInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFixedLogo, setShowFixedLogo] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useClickOutside({
    refs: [sidebarRef, hamburgerRef],
    handler: () => setIsMobileMenuOpen(false),
    active: isMobileMenuOpen,
  });

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

  // useEffect(() => {
  // fetchAdapter("/api/ourProjects", {
  //   headers: {
  //     "x-platform": "web",
  //   },
  // })
  //   .then((data) => {
  //     setProjectInfo(data?.data ?? []);
  //   })
  //   .catch((err) => console.error("Failed to fetch:", err));
  // }, []);

  useEffect(() => {
    if (projectInfo?.carouselImages?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === projectInfo?.carouselImages?.length - 1 ? 0 : prev + 1
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

  const currentShowCase = projectInfo?.carouselImages[currentIndex];
  const fallbackImage =
    "https://cdn.evhomes.tech/f5e53c63-905e-4c26-afc0-bd508c452ab7-about-banner.jpg";
  return (
    <div className={styles.scrollableContainer}>
      <div
        className={styles.herosection}
        style={{
          background: `url("${
            currentShowCase || fallbackImage
          }") no-repeat center center/cover`,
          position: "relative",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className={styles.overlay}>
          {/* Mobile  */}
          <div
            className={`${styles.logoContentMobile} ${
              !atTop
                ? showFixedLogo
                  ? styles.showMobile
                  : styles.hideMobile
                : ""
            }`}
          >
            <div className={styles.homeMobile}>
              <div className={styles.mobileTopSection}>
                <Link href="/">
                  <IoHome className={styles.icon} />
                </Link>
                <div className={styles.mobileLogo}>
                  <Image
                    src={projectInfo?.logo ?? "/images/evhomeslogo.png"}
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </div>
              </div>

              <div className={styles.hamburger} ref={hamburgerRef}>
                <Checkbox
                  checked={isMobileMenuOpen}
                  onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
                />
              </div>
            </div>
          </div>
          <div
            className={`${styles.mobileSidebar} ${
              isMobileMenuOpen ? styles.open : ""
            }`}
            ref={sidebarRef}
          >
            <div className={styles.sidebarLogo}>
              <Image
                src={projectInfo?.logo ?? "/images/evhomeslogo.png"}
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            <ul className={styles.sidebarLinks}>
              <li>{projectInfo?.name ?? ""}</li>
              <li
                onClick={() => {
                  scrollToSection("description");
                  setIsMobileMenuOpen(false);
                }}
              >
                Description
              </li>
              <li
                onClick={() => {
                  scrollToSection("amenities");
                  setIsMobileMenuOpen(false);
                }}
              >
                Amenities
              </li>
              <li
                onClick={() => {
                  scrollToSection("configuration");
                  setIsMobileMenuOpen(false);
                }}
              >
                Configuration
              </li>
            </ul>
            <div className={styles.sidebarBottom}>
              <div className={styles.address}>
                <CiLocationOn className={styles.icon} />{" "}
                {projectInfo?.name ?? ""}, {projectInfo?.locationName ?? ""}
              </div>
              <div className={styles.contactUsOn}>Contact Us On</div>
              <div className={styles.phone}>
                <LuPhone className={styles.icon} /> +91 8291668777
              </div>
              <div className={styles.email}>
                <MdOutlineMailOutline className={styles.icon} />
                {projectInfo?.contactEmail ?? "deepak@evgroup.co.in"}
              </div>
              <div className={styles.contactUsOn}>Download Now!</div>
              <Link
                className={`${styles.bhkButton} ${styles.active}`}
                href={projectInfo?.brochure}
                download="Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDownload />
                <span>Brochure</span>
              </Link>
            </div>
          </div>
          {/* MObile end */}

          <div className={styles.navbar}>
            <div className={styles.topContent}>
              <div className={styles.location}>
                <Link href="/">
                  <IoHome className={styles.icon} />
                </Link>
                <div>
                  <CiLocationOn className={styles.icon} />
                  {projectInfo?.name ?? ""}, {projectInfo?.locationName ?? ""}
                </div>
              </div>
              <div className={styles.contact}>
                <span className={styles.phone}>
                  <LuPhone className={styles.icon} />
                  +91 8291668777
                </span>
                <span className={styles.styleIcon}>
                  <PiDiamondsFourDuotone />
                </span>
                <span className={styles.email}>
                  <MdOutlineMailOutline className={styles.icon} />
                  {projectInfo?.contactEmail ?? "deepak@evgroup.co.in"}
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
                  src={projectInfo?.logo ?? "/images/evhomeslogo.png"}
                  alt={projectInfo?.name ?? "EV Homes Logo"}
                  width={300}
                  height={10}
                  style={{
                    maxHeight: 100,
                    maxWidth: 360,
                    width: "auto",
                    height: "auto",
                  }}
                  layout="intrinsic"
                />
              </div>
              <ul className={styles.logoList}>
                <li>{projectInfo?.name ?? ""}</li>
                <li onClick={() => scrollToSection("description")}>
                  Description
                </li>
                <li onClick={() => scrollToSection("amenities")}>Amenities</li>
                <li onClick={() => scrollToSection("configuration")}>
                  Configuration
                </li>
              </ul>
              <Link
                className={`${styles.bhkButton} ${styles.active}`}
                href={projectInfo?.brochure}
                download="Brochure.pdf"
                target="_blank" // This opens the file in a new tab
                rel="noopener noreferrer" // For security reasons, always add this when using target="_blank"
              >
                {/* <button className={`${styles.bhkButton} ${styles.active}`}> */}
                <FaDownload />
                <span>Brochure</span>
                {/* </button> */}
              </Link>
            </div>
          </div>

          <div className={styles.heroText}>
            <div className={styles.smallText} key={currentIndex + "-small"}>
              {heroTexts[currentIndex % heroTexts.length].small}
              <div className={styles.designWrapper}>
                <Image
                  src="/images/design.png"
                  alt="Building"
                  width={200}
                  height={100}
                />
              </div>
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
      <DescriptionSection projectInfo={projectInfo} />
      <AmenitiesSection projectInfo={projectInfo} />
      <ConfigurationSection projectInfo={projectInfo} />
      {!atTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={styles.scrollToTop}
        >
          <FaAngleUp />
        </button>
      )}
    </div>
  );
};

export default ProjectNavbar;
