// src/pages/BlogViewWrapper.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogViewPage from './BlogViewPage';
import blogService from '../../adminpanel/services/BlogService';
// ⚠️ IMPORTANT: Replace this with your actual service logic



const BlogViewWrapper = () => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the ID from the URL: /blog/view/:id

  useEffect(() => {
    if (id) {
      setLoading(true);
      blogService.getBlogById(id)
        .then(res=> {
          setBlogData(res.data);
        console.log(blogData)
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching blog:", error);
          setLoading(false);
          // Handle error state display here
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-green-500">
        <div className="animate-spin border-t-2 border-green-500 rounded-full w-8 h-8"></div>
        <p className="ml-3">Loading Blog Post...</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-500">
        Blog post not found or an error occurred.
      </div>
    );
  }

  // Pass the fetched data down as a prop to the UI component
  return <BlogViewPage blog={blogData} />;
};

export default BlogViewWrapper;