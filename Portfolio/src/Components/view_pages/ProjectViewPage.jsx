import React from 'react';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  User, 
  Layers, 
  Globe, 
  Lock, 
  Clock,
  ArrowLeft,
  FileText
} from 'lucide-react';
import projectService from '../../adminpanel/services/projectService';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProjectViewPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    import("../../adminpanel/css/TailwindOnly.css");
  }, []);

  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await projectService.getProjectById(id);
        const projectData = Array.isArray(response.data) ? response.data[0] : response.data;
        setProject(projectData);
      } catch (error) {
        // Handle fetch project error silently
      }
    }

    fetchProjects();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="animate-pulse font-mono">Loading Project Data...</div>
        </div>
      </div>
    );
  }

  const { 
    title, 
    description, 
    image, 
    liveUrl, 
    repoUrl, 
    techStack, 
    owner, 
    createdAt, 
    updatedAt, 
    isPublic,
    category
  } = project;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const parseTechStack = (tech) => {
    if (!tech) return [];
    if (Array.isArray(tech)) return tech;
    if (typeof tech === 'string') return tech.split(',').map(t => t.trim()).filter(Boolean);
    return [];
  };

  const formattedTech = parseTechStack(techStack);

  // Helper to format long descriptions into clean, readable paragraphs
  const renderFormattedDescription = (text) => {
    if (!text) return <p className="text-gray-500 italic">No description provided for this project.</p>;

    // Split on double linebreaks or newlines first
    let paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    // If description is a single block without linebreaks, attempt smart paragraph splitting
    if (paragraphs.length === 1) {
      const raw = paragraphs[0];
      const splitPattern = /(?=(?:Project Description|Project Overview|Key Features|Architecture|Problem Statement|Solution|Overview|Features)[:\s])/i;
      const sections = raw.split(splitPattern).map(s => s.trim()).filter(Boolean);

      if (sections.length > 1) {
        paragraphs = sections;
      } else {
        // Break long single string into ~2-3 sentence paragraph blocks
        const sentences = raw.match(/[^.!?]+[.!?]+/g) || [raw];
        const chunks = [];
        for (let i = 0; i < sentences.length; i += 3) {
          chunks.push(sentences.slice(i, i + 3).join(' ').trim());
        }
        paragraphs = chunks;
      }
    }

    return (
      <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
        {paragraphs.map((paragraph, index) => {
          // Check for subheaders like "Project Overview:" or "Key Features:"
          const headerMatch = paragraph.match(/^([A-Za-z\s]{3,30}:)/);
          if (headerMatch) {
            const label = headerMatch[1];
            const content = paragraph.slice(label.length).trim();
            return (
              <div key={index} className="space-y-2 mt-4">
                <h4 className="text-xl font-bold text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  {label.replace(':', '')}
                </h4>
                {content && (
                  <p className="text-gray-300 leading-relaxed font-sans">
                    {content}
                  </p>
                )}
              </div>
            );
          }

          return (
            <p key={index} className="text-gray-300 leading-relaxed font-sans">
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans pt-24 pb-20 px-4 md:px-8 selection:bg-green-500 selection:text-black">
      
      {/* Subtle Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] from-green-950/30 via-black to-black -z-10" />

      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-green-500/50 text-green-400 text-sm font-medium transition-all"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>

          <div className="flex items-center gap-2">
            {category && (
              <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs font-semibold uppercase tracking-wider">
                {category}
              </span>
            )}
            {isPublic !== false ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-xs font-bold uppercase tracking-wider">
                <Globe size={12} /> Public
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-600 text-neutral-400 text-xs font-bold uppercase tracking-wider">
                <Lock size={12} /> Private
              </span>
            )}
          </div>
        </div>

        {/* Project Header Title & Creator Meta */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 pt-2 border-b border-neutral-800 pb-6">
            <div className="flex items-center gap-2">
              <User size={16} className="text-green-500" />
              <span>Created by <strong className="text-white">{owner?.name || 'Developer'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-500" />
              <span>Created: <span className="font-mono text-gray-300">{formatDate(createdAt)}</span></span>
            </div>
            {updatedAt && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-green-500" />
                <span>Updated: <span className="font-mono text-gray-300">{formatDate(updatedAt)}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Top Hero Image Banner */}
        {image && (
          <div className="relative rounded-2xl overflow-hidden border border-green-900/40 bg-neutral-950 shadow-2xl max-h-[460px] w-full">
            <img 
              src={image} 
              alt={`${title} project banner`} 
              className="w-full h-full max-h-[460px] object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Action Buttons & Tech Stack Box */}
        <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            {liveUrl && (
              <a 
                href={liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-green-900/30"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
            
            {repoUrl && (
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-green-500/50 text-white font-medium transition-all hover:shadow-lg"
              >
                <Github size={18} /> View Code
              </a>
            )}
          </div>

          {/* Tech Stack */}
          {formattedTech.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono uppercase tracking-wider mr-2">
                <Layers size={14} className="text-green-500" /> Stack:
              </span>
              {formattedTech.map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-neutral-950 border border-green-500/20 text-green-400 text-xs font-mono font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* FULL WIDTH PROJECT OVERVIEW SECTION DIRECTLY BELOW */}
        <section className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-6 md:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
            <div className="p-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/30">
              <FileText size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Project Overview</h2>
              <p className="text-xs text-neutral-400 font-mono">Detailed breakdown &amp; system specifications</p>
            </div>
          </div>

          {/* Paragraph formatted description */}
          <div className="pt-2">
            {renderFormattedDescription(description)}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectViewPage;