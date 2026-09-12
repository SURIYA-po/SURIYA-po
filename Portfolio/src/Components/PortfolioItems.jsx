import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PortfolioItems.css';
import ProjectCard from './ProjectCard';
import SkillTag from './SkillTag';
import { db } from '../Services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const PortfolioItems = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'My_details'));
        setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        // Handle fetch error silently
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category || 'Web Development'))];
  const filtered = category === 'All'
    ? projects
    : projects.filter(p => (p.category || 'Web Development') === category);

  if (loading) {
    return (
      <div  className="portfolio-items-container " >
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

 return (
  <div className="portfolio-items-container">
    <div className="portfolio-main-content">
      {/* Header & Back Button */}
      <div className="portfolio-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1 className="portfolio-title">My Portfolio</h1>
        <p className="portfolio-subtitle">
          Explore my WordPress and frontend development projects, from sleek websites to innovative interfaces.
        </p>
      </div>

      {/* Category Filters */}
      <div className="portfolio-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="projects-list">
        {filtered.length > 0
          ? filtered.map(proj => <ProjectCard key={proj.id} project={proj} />)
          : <div className="no-projects"><p>No projects in this category.</p></div>}
      </div>
    </div>

    {/* Skills Cloud Sidebar */}
    <div className="skills-cloud-sidebar">
      <div className="skills-cloud">
        {['cPanel','MySQL','PHP','SalesForce','WHM','WordPress','CSS','Figma','ACF','JavaScript','HTML','Gulp','npm','SASS','Three.js']
          .map(tag => <SkillTag key={tag} label={tag} />)}
      </div>
    </div>
  </div>
);

};

export default PortfolioItems;
