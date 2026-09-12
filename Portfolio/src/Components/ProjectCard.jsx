import React from 'react';
import './ProjectCard.css';
import SkillTag from './SkillTag';

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const parseTechStack = (tech) => {
    if (!tech) return [];
    if (Array.isArray(tech)) return tech;
    if (typeof tech === 'string') return tech.split(',').map(t => t.trim()).filter(Boolean);
    return [];
  };

  const techList = project.technologies || parseTechStack(project.techStack);

  return (
    <div className="project-card">
      <div className="card-content">
        <h3 className="project-title">{project.name || project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="tech-list">
          {techList.map((tech, idx) => (
            <SkillTag key={idx} label={tech} />
          ))}
        </div>
        <a
          href={project.homepage || project.githubUrl || project.liveUrl || project.repoUrl || '#'}
          className="project-link"
          target="_blank"
          rel="noreferrer"
        >
          View Project →
        </a>
      </div>
      <div className="card-logo">
        {project.image ? (
          <img src={project.image} alt={project.name || project.title} />
        ) : (
          <span className="logo-text">
            {(project.name || project.title || 'P').charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
