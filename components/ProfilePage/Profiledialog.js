"use client";

import React, { useEffect } from "react";
import styles from "./profiledialog.module.css";
import { FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const Profiledialog = ({ isOpen, onClose }) => {
  const { logout, user } = useUser();
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const onClickLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigateTo("/");
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* <button className={styles.closeButton} onClick={onClose}></button> */}

        <div className={styles.profileContainer}>
          {/* Profile sectionn */}
          <div className={styles.profileSection}>
            <div
              className={styles.profileImage}
              style={{
                backgroundSize: "50px 50px",
                background: `url("${
                  user?.profilePic ??
                  "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                }") no-repeat center center/cover`,
              }}
            ></div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {user?.firstName ?? ""} {user?.lastName ?? ""}
              </div>
              <div className={styles.userDesignation}>
                {user?.designation?.designation ?? ""}
              </div>
            </div>

            <div className={styles.profileActions}>
              <div className={styles.customButtonOrange}>
                <div className={styles.iconCircleOrange}>
                  <FaUserEdit />
                </div>
                <div className={styles.textBoxOrange}>Edit Profile</div>
              </div>

              <div className={styles.customButtonBlue}>
                <div className={styles.iconCircleBlue}>
                  <FaKey />
                </div>
                <div className={styles.textBoxBlue}>Change Password</div>
              </div>

              <div className={styles.customButtonRed} onClick={onClickLogout}>
                <div className={styles.iconCircleRed}>
                  <FaSignOutAlt />
                </div>
                <div className={styles.textBoxRed}>Logout</div>
              </div>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.perRepoContainer}>
              {/* Personal Inf */}
              <div className={styles.personalInfoSection}>
                <h3 className={styles.sectionHeading}>Personal Information</h3>
                <div className={styles.infoRow}>
                  <span>Employee ID : </span>{" "}
                  <span>{user?.employeeId ?? "NA"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Full Name : </span>{" "}
                  <span>
                    {user?.firstName ?? ""} {user?.lastName ?? ""}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span>Division : </span>{" "}
                  <span>{user?.division?.division ?? "NA"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Department : </span>{" "}
                  <span>{user?.department?.department ?? "NA"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Designation : </span>{" "}
                  <span>{user?.designation?.designation ?? "NA"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Martial Status : </span>{" "}
                  <span>{user?.maritalStatus ?? "NA"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Blood Group : </span>{" "}
                  <span>{user?.bloodGroup ?? "NA"}</span>
                </div>
              </div>

              {/* Repo & Contact Info */}
              <div className={styles.repoContContainer}>
                <div className={styles.reportingInfoSection}>
                  <h3 className={styles.sectionHeading}>Reporting To</h3>
                  <div className={styles.repoSection}>
                    <div
                      className={styles.reportingToImage}
                      style={{
                        backgroundSize: "50px 50px",
                        background: `url("${
                          user?.reportingTo?.profilePic ??
                          "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg"
                        }") no-repeat center center/cover`,
                      }}
                    ></div>
                    <div className={styles.repoInfo}>
                      <div className={styles.infoRow}>
                        {user?.reportingTo?.firstName ?? ""}{" "}
                        {user?.reportingTo?.lastName ?? ""}
                      </div>
                      <div className={styles.infoRow}>
                        ({user?.reportingTo?.designation?.designation ?? ""})
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.contactInfoSection}>
                  <h3 className={styles.sectionHeading}>Contact Information</h3>
                  <div className={styles.infoRow}>
                    <span>Phone No. : </span>{" "}
                    <span>{user?.phoneNumber ?? "NA"}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Email : </span> <span>{user?.email ?? "NA"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Info */}
            <div className={styles.leaveInfoSection}>
              <h3 className={styles.sectionHeading}>Leave Information</h3>
              <div className={styles.infoRow}>
                <span>Paid Leave : </span> <span>0</span>
              </div>
              <div className={styles.infoRow}>
                <span>Casual Leave : </span> <span>0</span>
              </div>
              <div className={styles.infoRow}>
                <span>Compensatory Leave : </span> <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiledialog;
