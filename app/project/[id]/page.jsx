"use client";
import React from "react";
import styles from "./projectpage.module.css";
import ProjectNavbar from "@/components/Project/ProjectNavbar";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const { id } = useParams(); 

  console.log("URL project ID:", id); 

  return (
    <div className="project-page">
      <ProjectNavbar />
    </div>
  );
};

export default ProjectPage;
