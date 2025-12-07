// src/components/Projects.jsx

import React from 'react';
import PbCard from './PbCard'; // Adjust path as needed
import { projectsData, allSkills } from '../assets/projectdata'; // Adjust path as needed
import '../assets/project.css';
import { Link } from 'react-router-dom';
import blogService from '../adminpanel/services/BlogService';
import { useEffect, useState } from 'react';

function Blog() {

  const [blogData, setBlogData] = useState([]);
   useEffect(() => {
      async function fetchBlogs() {
        try {
          const response = await blogService.getBlogs();
          setBlogData(response.data);
          console.log(blogData)
        } catch (error) {
          console.error("Failed to fetch blogs:", error);
        }
      }
  
      fetchBlogs();
    }, []);
  return (
    <div className="projects-page-container">
      {/* Page Title - You might wrap this in a header later */}
      <h1 className="projects-main-title">Bits & Pieces ✨</h1> 

      <div className="projects-content-grid">
        {/* Left Column for Project Cards */}
        <div className="projects-list">
          {blogData.map((blog) => (
            // Pass the entire project object as the 'data' prop to PbCard
           <Link to={`/blog/view/${blog._id}`}> 
           
           <PbCard key={blog._id} data={blog} /> </Link>
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
          <Link to="/createblog">Create Blog Post </Link>
        </div>
      </div>
    </div>
  );
}

export default Blog;