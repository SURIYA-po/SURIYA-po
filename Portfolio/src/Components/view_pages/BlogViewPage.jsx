// src/components/BlogViewPage.jsx
import React from 'react';
import { Calendar, User, Tag, Heart, Share2, Eye } from 'lucide-react';
import { useEffect,useState } from 'react';

const BlogViewPage = ({ blog }) => {

    
        useEffect(() => {
          // In a real project, you would ensure Tailwind CSS is properly imported/configured
          import("../../adminpanel/css/TailwindOnly.css");
        }, []);

  if (!blog) return null; // Should be handled by the Wrapper, but good practice

  const {
    title,
    content,
    coverImage,
    author,
    createdAt,
    tags,
    likes,
    shares,
    isPublished,
    excerpt
  } = blog;

  console.log(blog)
  // Helper to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper to parse tags (since your example shows tags as a string array inside an array)
  const parsedTags = Array.isArray(tags) && tags.length > 0 && typeof tags[0] === 'string'
    ? JSON.parse(tags[0])
    : [];
  
  // Custom Styles for the content area to integrate with the dark theme
  const contentStyle = `
    .blog-content h1, .blog-content h2 { color: #ffffff; margin-top: 1.5rem; margin-bottom: 0.5rem; border-bottom: 1px solid #16a34a; padding-bottom: 0.25rem; }
    .blog-content p { margin-bottom: 1rem; line-height: 1.75; }
    .blog-content a { color: #34d399; text-decoration: underline; }
    .blog-content pre { background-color: #171717; padding: 1rem; border-left: 4px solid #10b981; overflow-x: auto; font-family: monospace; }
    .blog-content ul, .blog-content ol { margin-left: 1.5rem; margin-bottom: 1rem; }
    .blog-content li { margin-bottom: 0.5rem; }
  `;

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans pb-16">
      <style>{contentStyle}</style>

      {/* Hero Image */}
      <div className="w-full h-96 overflow-hidden relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x400/0a0a0a/00ff00?text=Blog+Image+Not+Found"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <article className="max-w-4xl mx-auto px-6 -mt-24 relative z-10">
        {/* Title and Metadata */}
        <header className="mb-8 p-6 rounded-xl bg-neutral-900/90 backdrop-blur-sm border border-green-900/40 shadow-xl shadow-green-900/10">
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xl italic text-green-400 mb-4">{excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <User size={16} className="text-green-500" />
              <span>By **{author?.name || 'Unknown'}**</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-500" />
              <span>Published on {formatDate(createdAt)}</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="bg-neutral-900/50 p-8 rounded-xl border border-neutral-800/50 shadow-lg mb-8">
          <div 
            className="blog-content text-gray-300 text-lg"
            // ⚠️ Dangerously set to allow HTML content from the DB to render
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>

        {/* Footer: Tags and Social */}
        <footer className="pt-6 border-t border-green-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag size={18} className="text-green-500 shrink-0" />
            {parsedTags.length > 0 ? (
              parsedTags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs px-3 py-1 rounded-full bg-neutral-800 border border-green-600/30 text-green-300 font-mono tracking-wider"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-neutral-600 italic">No tags</span>
            )}
          </div>

          {/* Social Stats */}
          <div className="flex items-center gap-6 text-neutral-500">
            <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer">
              <Heart size={20} />
              <span className="text-white font-medium">{likes}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-green-500 transition-colors cursor-pointer">
              <Share2 size={20} />
              <span className="text-white font-medium">{shares}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={20} />
              <span className="text-neutral-400">Views (N/A)</span>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogViewPage;