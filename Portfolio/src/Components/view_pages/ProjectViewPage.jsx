import React from 'react';
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  User, 
  Layers, 
  Globe, 
  Lock, 
  Clock 
} from 'lucide-react';
import projectService from '../../adminpanel/services/projectService';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';


const ProjectViewPage = () => {

    useEffect(() => {
      // In a real project, you would ensure Tailwind CSS is properly imported/configured
      import("../../adminpanel/css/TailwindOnly.css");
    }, []);
  
  const [project, setProject] = useState(null);
  const { id } = useParams(); // Extract the 'id' from the URL

  useEffect(() => {
    // ⚠️ Replace this with your actual API endpoint and fetch logic
   async function fetchProjects() {
      try {
        const response = await projectService.getProjectById(id);
       
        setProject(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    }

    fetchProjects();
  

  }, [id]); // Re-run effect if the ID in the URL changes
  // 1. Fail-safe: Handle case where prop is not yet loaded
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-500">
        <div className="animate-pulse">Loading Project Data...</div>
      </div>
    );
  }

  // 2. Destructuring for cleaner code access
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
    isPublic 
  } = project;
  console.log("project data:",description)

  // 3. Helper to format dates nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans selection:bg-green-500 selection:text-black">
      
      {/* Background decoration (subtle gradient glow) */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Breadcrumb / Back Navigation Placeholder */}
        <div className="mb-8 text-sm text-green-500/60 font-mono tracking-widest uppercase">
          Projects / {title}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Visuals & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Image Container */}
            <div className="group relative rounded-2xl overflow-hidden border border-green-900/50 shadow-2xl shadow-green-900/10 bg-neutral-900 aspect-video">
              <img 
                src={image} 
                alt={`${title} project preview`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                // Fallback in case image breaks
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x450/000000/00ff00?text=No+Image";
                }}
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 right-4">
                {isPublic ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/50 text-green-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    <Globe size={12} /> Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-600 text-neutral-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    <Lock size={12} /> Private
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {liveUrl && (
                <a 
                  href={liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 hover:bg-green-500 text-black font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-green-900/20"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
              
              {repoUrl && (
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-green-500/50 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-900/10"
                >
                  <Github size={20} />
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Project Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Header Section */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                {title}
              </h1>
              <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                <span>ID: {project._id.slice(-6)}</span>
              </div>
            </div>

            {/* Owner Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-400 border border-green-500/20">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide">Created By</p>
                <p className="text-white font-medium">{owner?.name || 'Unknown Author'}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                Project Overview
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Layers size={18} className="text-green-500" />
                Tech Stack
              </h3>
              
              {techStack && techStack.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-green-400 text-sm hover:border-green-500/50 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 italic text-sm">No tech stack listed.</p>
              )}
            </div>

            {/* Timeline Meta Data */}
            <div className="pt-8 mt-auto border-t border-neutral-800 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
                  <Calendar size={14} /> Created
                </span>
                <span className="text-gray-300 font-mono text-sm">{formatDate(createdAt)}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider">
                  <Clock size={14} /> Last Updated
                </span>
                <span className="text-gray-300 font-mono text-sm">{formatDate(updatedAt)}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewPage;