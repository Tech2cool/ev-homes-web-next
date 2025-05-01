"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Profiledialog from "../ProfilePage/Profiledialog";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const mobileMenuRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      setIsMobileMenuOpen(false);
    }, 400);
  };

  const customNavStyle = {
    ...(pathname === "/" ? { backgroundColor: "#3333336d" } : {}),
  };
  const navigateTo = (path) => {
    router.push(path);
  };

  const renderNavLinks = (handleClick = () => {}) => {
    return user ? (
      <>
      <li
          className={pathname === "/watch-folder" ? styles.active : ""}
          onClick={() => {
            navigateTo("/watch-folder");
            handleClick();
          }}
        >
          Watch
        </li>
        <li
          className={pathname === "/dashboard" ? styles.active : ""}
          onClick={() => {
            navigateTo("/dashboard");
            handleClick();
          }}
        >
          Dashboard
        </li>
        <li
          className={pathname === "/leads" ? styles.active : ""}
          onClick={() => {
            navigateTo("/leads");
            handleClick();
          }}
        >
          Leads
        </li>
        <li
          className={pathname === "/tasks" ? styles.active : ""}
          onClick={() => {
            navigateTo("/tasks");
            handleClick();
          }}
        >
          Tasks
        </li>
        {/* <li
          className={pathname === "/follow-up" ? styles.active : ""}
          onClick={() => {
            navigateTo("/follow-up");
            handleClick();
          }}
        >
          Follow Up
        </li> */}
        <li
          className={pathname === "/attendance" ? styles.active : ""}
          onClick={() => {
            navigateTo("/attendance");
            handleClick();
          }}
        >
          Attendance
        </li>
      </>
    ) : (
      <>
        <li
          className={pathname === "/projects" ? styles.active : ""}
          onClick={() => {
            navigateTo("/projects");
            handleClick();
          }}
        >
          Projects
        </li>
        <li
          className={pathname === "/contact-us" ? styles.active : ""}
          onClick={() => {
            navigateTo("/contact-us");
            handleClick();
          }}
        >
          About Us
        </li>
      </>
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      style={customNavStyle}
    >
      <div
        className={styles.hamburger}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <BsLayoutSidebarInset />
        ) : (
          <BsLayoutSidebarInsetReverse />
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className={`${styles.mobileMenu} ${
            isAnimatingOut ? styles.slideOut : styles.slideIn
          }`}
          ref={mobileMenuRef}
        >
          <div className={styles.closeIcon} onClick={handleClose}>
            <BsLayoutSidebarInset />
          </div>
          <div className={styles.logoMobile} onClick={() => navigateTo("/")}>
            <Image
              src="/images/evhomeslogo.png"
              alt="EV Homes Logo"
              width={150}
              height={30}
            />
          </div>

          <ul className={styles.mobileNavLinks}>
            <li
              onClick={() => {
                navigateTo("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Home
            </li>
            {renderNavLinks(() => setIsMobileMenuOpen(false))}
          </ul>
        </div>
      )}

      <div className={styles.logo} onClick={() => navigateTo("/")}>
        <Image
          src="/images/evhomeslogo.png"
          alt="EV Homes Logo"
          width={180}
          height={20}
        />
      </div>

      <ul className={styles.navLinks}>
        <li
          className={pathname === "/" ? styles.active : ""}
          onClick={() => navigateTo("/")}
        >
          Home
        </li>
        {renderNavLinks()}
      </ul>

      <div className={styles.icons}>
        {user ? (
          <>
            <FaBell className={styles.icon} />
            <FaUserCircle
              className={styles.icon}
              onClick={() => setIsProfileOpen(true)}
            />
          </>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => navigateTo("/login")}
          >
            Login
          </button>
        )}
      </div>

      <Profiledialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </nav>
  );
};
export default Navbar;
