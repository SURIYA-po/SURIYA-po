// src/components/Projects.jsx
import { useEffect, useState, useContext } from 'react';
import React from 'react';
import PbCard from './PbCard'; 
// import { allSkills } from '../assets/projectdata'; // REMOVED: No longer needed
import '../assets/project.css';
import { Link } from 'react-router-dom';
import projectService from '../adminpanel/services/projectService';
import { AuthContext } from '../context/AuthContext';

function Projects() {
  const auth = useContext(AuthContext);
  const user = auth.user;
  
  const [projectsData, setProjectData] = useState([]);
  // NEW STATE: To hold the unique tags fetched from the backend
  const [uniqueTags, setUniqueTags] = useState([]); 

  useEffect(() => {
    // Import Tailwind CSS (Kept existing behavior)
    import("../adminpanel/css/TailwindOnly.css");
  }, []);

  // EFFECT 1: Fetch all public projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Assuming projectService.getProjects() calls the public endpoint
        const response = await projectService.getProjects(); 
        setProjectData(response.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }
    fetchProjects();
  }, []);

  // --- NEW EFFECT: Fetch unique tags ---
  useEffect(() => {
    async function fetchUniqueTags() {
      try {
        // Assuming you add a new function to projectService 
        // that calls the new /tags/unique API endpoint
        const response = await projectService.getUniqueTags(); 
        setUniqueTags(response.data);
      } catch (error) {
        console.error("Failed to fetch unique tags:", error);
        // Fallback: Optionally set a default tag array if API fails
        setUniqueTags([]);
      }
    }
    fetchUniqueTags();
  }, []);
  // -------------------------------------

  return (
    <div className="projects-page-container">
      {/* Page Title - You might wrap this in a header later */}
      <h1 className="projects-main-title">Bits & Pieces ✨</h1> 

      <div className="projects-content-grid">
        {/* Left Column for Project Cards */}
        <div className="projects-list">
          {projectsData.map((project) => (
            // Pass the entire project object as the 'data' prop to PbCard
            <Link to={`/project_view_page/${project._id}`} key={project._id}>
              <PbCard data={project} />
            </Link>
          ))}

          { user && <Link
            to="/createproject"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
          >
            Create Project
          </Link>}
        </div>

        {/* Right Column for Introduction and Tags/Skills */}
        <div className="projects-sidebar">
          <p className="projects-intro-text">
            Take a look at my portfolio to view my WordPress and frontend development projects. Discover
            sleek websites, frontend tricks, and more for inspiration on your next web project.
          </p>

          <h3 className="projects-skills-heading">Project Tags</h3>
          <div className="projects-skills-list">
            {/* UPDATED: Mapping over the fetched uniqueTags state */}
            {uniqueTags.map((tag, index) => (
              <span key={index} className="projects-skill-tag">
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Projects;