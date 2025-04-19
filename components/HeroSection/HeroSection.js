"use client";

import React, { useEffect, useState } from "react";
import "./HeroSection.css";
import fetchAdapter from "@/adapter/fetchAdapter";

const HeroSection = () => {
  const [projectInfo, setProjectInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projectInfo.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projectInfo.length - 1 : prev - 1));
  };

  const currentProject = projectInfo[currentIndex];
  const fallbackImage =
    "https://cdn.evhomes.tech/f5e53c63-905e-4c26-afc0-bd508c452ab7-about-banner.jpg";

  return (
    <div
      className="hero-section"
      style={{
        background: `url("${
          currentProject?.showCaseImageLandscape || fallbackImage
        }") no-repeat center center/cover`,
        position: "relative",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          {currentProject?.name || "EV Marina Bay"}
        </h1>
        <p className="hero-description">
          {currentProject?.description ||
            "Experience luxury living inspired by Singapore. Discover modern living at its finest."}
        </p>
        <p className="hero-location"> {currentProject?.locationName}</p>

        {/* <a
          href={
            currentProject?._id
              ? `/project/${currentProject._id}`
              : "#learn-more"
          }
          className="hero-button"
        >
          Learn More
        </a> */}

        <a
          href="/project" 
          className="hero-button"
        >
          Learn More
        </a>

        {projectInfo.length > 1 && (
          <>
            <button className="carousel-button left" onClick={handlePrev}>
              ◀
            </button>
            <button className="carousel-button right" onClick={handleNext}>
              ▶
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
