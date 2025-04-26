import ProjectNavbar from "@/components/Project/ProjectNavbar";
import fetchAdapter from "@/adapter/fetchAdapter";

const ProjectPage = async ({ params }) => {
  const { id } = params;

  let projectData = null;
  let error = "";

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.evhomes.tech";

    const res = await fetchAdapter(`${baseUrl}/ourProjects/${id}`, {
      method: "get",
    });
    projectData = res?.data;
  } catch (err) {
    error = err.message;
  }

  return (
    <div className="project-page">
      {projectData ? (
        <>
          <ProjectNavbar projectInfo={projectData} />
          {/* <div>Render project details here</div> */}
        </>
      ) : (
        <p>{error ? error : "Loading..."}</p>
      )}
    </div>
  );
};

export default ProjectPage;

// "use client";
// import React, { useEffect } from "react";
// import ProjectNavbar from "@/components/Project/ProjectNavbar";
// import { useParams } from "next/navigation";
// import { useData } from "@/context/dataContext";

// const ProjectPage = () => {
//   const { id } = useParams();
//   const { getProjectById } = useData();

//   useEffect(() => {
//     getProjectById(id);
//   }, [id]);

//   console.log("URL project ID:", id);

//   return (
//     <div className="project-page">
//       <ProjectNavbar />
//     </div>
//   );
// };

// export default ProjectPage;
