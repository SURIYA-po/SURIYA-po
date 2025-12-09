// src/components/Projects.jsx
import React, { useEffect, useState, useContext } from 'react';
import PbCard from './PbCard';
import { projectsData, allSkills } from '../assets/projectdata';
import '../assets/project.css';
import { Link } from 'react-router-dom';
import blogService from '../adminpanel/services/BlogService';
import { AuthContext } from '../context/AuthContext';
import ModernBlogPostForm from '../adminpanel/Forms/BlogPostForm';

function Blog() {
  const auth = useContext(AuthContext);
  const user = auth.user;

  const [blogData, setBlogData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    import("../adminpanel/css/TailwindOnly.css");
  }, []);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await blogService.getBlogs();
        setBlogData(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  const handleCreateBlogClick = (e) => {
    e.preventDefault();
    if (!user) window.location.href = "/login"; // fallback if not logged in
    else setShowForm(true);
  };

  return (
    <div className="projects-page-container relative">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="mt-4 projects-main-title text-3xl font-bold">Look at me ✨</h1>

        <span
          onClick={handleCreateBlogClick}
          className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition shadow-lg cursor-pointer"
        >
          {/* Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </div>

      {/* Blog Cards and Sidebar */}
      <div className="projects-content-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="projects-list md:col-span-2 flex flex-col gap-4">
          {blogData.map((blog) => (
            <Link key={blog._id} to={`/blog/view/${blog._id}`}>
              <PbCard data={blog} />
            </Link>
          ))}
        </div>

        <div className="projects-sidebar md:col-span-1">
          <p className="projects-intro-text mb-4">
            Take a look at my portfolio to view my WordPress and frontend development projects. Discover
            sleek websites, frontend tricks, and more for inspiration on your next web project.
          </p>

          <h3 className="projects-skills-heading font-semibold mb-2">Skills</h3>
          <div className="projects-skills-list flex flex-wrap gap-2">
            {allSkills.map((skill, index) => (
              <span key={index} className="projects-skill-tag bg-gray-600 text-gray-800 px-2 py-1 rounded-md text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Layer for Blog Form */}
      {showForm && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowForm(false)}
          ></div>

          {/* Form Container */}
          <div className="fixed mt-10 top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
    bg-gray-950 p-6 md:p-6 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <ModernBlogPostForm />
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
