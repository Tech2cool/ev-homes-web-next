"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Profiledialog from "../ProfilePage/Profiledialog";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const customNavStyle = {
    ...(pathname === "/" ? { backgroundColor: "#3333336d" } : {}),
  };
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar} style={customNavStyle}>
      <div className={styles.logo} onClick={() => navigateTo("/")}>
        <Image
          src="/images/evhomeslogo.png"
          alt="EV Homes Logo"
          width={250}
          height={50}
        />
      </div>
      <ul className={styles.navLinks}>
        <li
          className={pathname === "/" ? styles.active : ""}
          onClick={() => navigateTo("/")}
        >
          Home
        </li>
        {user ? (
          <>
            <li
              className={pathname === "/dashboard" ? styles.active : ""}
              onClick={() => navigateTo("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className={pathname === "/leads" ? styles.active : ""}
              onClick={() => navigateTo("/leads")}
            >
              Leads
            </li>

            <li
              className={pathname === "/tasks" ? styles.active : ""}
              onClick={() => navigateTo("/tasks")}
            >
              Tasks
            </li>
            <li
              className={pathname === "/follow-up" ? styles.active : ""}
              onClick={() => navigateTo("/follow-up")}
            >
              Follow Up
            </li>
            <li
              className={pathname === "/attendance" ? styles.active : ""}
              onClick={() => navigateTo("/attendance")}
            >
              Attendance
            </li>
          </>
        ) : (
          <>
            <li
              className={pathname === "/projects" ? styles.active : ""}
              onClick={() => navigateTo("/projects")}
            >
              Projects
            </li>
            <li
              className={pathname === "/contact-us" ? styles.active : ""}
              onClick={() => navigateTo("/contact-us")}
            >
              About Us
            </li>
          </>
        )}
      </ul>
      <div className={styles.icons}>
        {user ? (
          <>
            {/* <button className={styles.moreButton}>
              More<span className={styles.plus}>+</span>
            </button> */}
            <FaBell className={styles.icon} />
            <FaUserCircle
              className={styles.icon}
              onClick={() => setIsProfileOpen(true)}
            />
          </>
        ) : (
          <>
            <button
              className={styles.loginBtn}
              onClick={() => navigateTo("/login")}
            >
              Login
            </button>
          </>
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
