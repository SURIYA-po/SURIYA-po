// src/components/Projects.jsx
import { useEffect, useState } from 'react';
import React from 'react';
import PbCard from './PbCard'; // Adjust path as needed
import { projectsData, allSkills } from '../assets/projectdata'; // Adjust path as needed
import '../assets/project.css';
import { Link } from 'react-router-dom';
import { use } from 'react';
import projectService from '../adminpanel/services/projectService';

function Projects() {
  const [projectsData, setProjectData] = useState([]);
 useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await projectService.getProjects();
        console.log(response.data)
        setProjectData(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    fetchProjects();
  }, []);
//  fetchProjects();
  return (
    <div className="projects-page-container">
      {/* Page Title - You might wrap this in a header later */}
      <h1 className="projects-main-title">Bits & Pieces ✨</h1> 

      <div className="projects-content-grid">
        {/* Left Column for Project Cards */}
        <div className="projects-list">
          {projectsData.map((project) => (
            // Pass the entire project object as the 'data' prop to PbCard
            <Link to={`/project_view_page/${project._id}`}>
            <PbCard key={project._id} data={project} />
            </Link>
          ))}
        </div>

        {/* Right Column for Introduction and Skills */}
        <div className="projects-sidebar">
          <p className="projects-intro-text">
            Take a look at my portfolio to view my WordPress and frontend development projects. Discover
            sleek websites, frontend tricks, and more for inspiration on your next web project.
          </p>

          <h3 className="projects-skills-heading">Skills</h3>
          <div className="projects-skills-list">
            {allSkills.map((skill, index) => (
              <span key={index} className="projects-skill-tag">
                {skill}
              </span>
            ))}
          </div>
          <Link to="/createproject">Create Project </Link>
        </div>
      </div>
    </div>
  );
}

export default Projects;