import React, { useState, useEffect } from "react";
// Assume axios is installed: npm install axios
import axios from "axios";
import blogService from "../services/BlogService";

// NOTE: Replace this URL with your actual API endpoint
const API_URL = "/api/v1/posts";

export default function ModernBlogPostForm() {
  // Lazily import Tailwind CSS styles once component mounts (standard practice in some setups)
  useEffect(() => {
    // In a real project, you would ensure Tailwind CSS is properly imported/configured
    import("../css/TailwindOnly.css");
  }, []);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "", // Stored as a comma-separated string initially
    isPublished: false,
  });

  const [coverImage, setCoverImage] = useState(null); // State for the file object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]); // Get the first selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // 1. Create FormData object for sending multipart/form-data (required for files)
    const formData = new FormData();

    // 2. Append text fields
    formData.append("title", form.title);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.content);
    formData.append("isPublished", form.isPublished);

    // Convert comma-separated string of tags into an array of strings
    const tagArray = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    formData.append("tags", JSON.stringify(tagArray)); // Send tags as a JSON string

    // 3. Append the file if it exists
    if (coverImage) {
      formData.append("coverImage", coverImage); // 'coverImage' must match the Multer field name on the server
    }

    try {
      // 4. Send the request
      const response = await blogService.createBlog(formData);

      setSuccess(`Post created successfully! Title: ${response.data.title}`);
      setForm({ title: "", excerpt: "", content: "", tags: "", isPublished: false }); // Reset form
      setCoverImage(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unknown error occurred during post creation.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-950 p-6 md:p-12 ">
      <form
        onSubmit={handleSubmit}
        // IMPORTANT: Must set encType for file uploads
        encType="multipart/form-data" 
        className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 text-white"
      >
        <header className="mb-10 border-b border-gray-700 pb-4">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Content Creator Dashboard ✍️
          </h2>
          
        </header>

        {/* Status Messages */}
        {success && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-500/20">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-500/20">
            Error: {error}
          </div>
        )}
        
        <div className="space-y-6">
          {/* Title Field */}
          <div className="relative">
            <label
              htmlFor="title"
              className="block text-sm font-semibold mb-2 text-gray-300"
            >
              Blog Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition duration-200 placeholder-gray-500 text-lg"
              placeholder="e.g., The Future of React Hooks"
              required
            />
          </div>

          {/* Excerpt Field */}
          <div className="relative">
            <label
              htmlFor="excerpt"
              className="block text-sm font-semibold mb-2 text-gray-300"
            >
              Short Excerpt (SEO/Preview)
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              maxLength="160"
              className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition duration-200 placeholder-gray-500"
              placeholder="A brief, attention-grabbing summary (max 160 chars)"
              required
            />
          </div>

          {/* Content Field */}
          <div className="relative">
            <label
              htmlFor="content"
              className="block text-sm font-semibold mb-2 text-gray-300"
            >
              Main Content
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="15"
              className="w-full px-5 py-4 bg-gray-800 rounded-xl border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition duration-200 resize-y placeholder-gray-500 text-base font-mono leading-relaxed"
              placeholder="Start writing your article here..."
              required
            ></textarea>
          </div>

          {/* Tags Field */}
          <div className="relative">
            <label
              htmlFor="tags"
              className="block text-sm font-semibold mb-2 text-gray-300"
            >
              Tags (Comma Separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition duration-200 placeholder-gray-500"
              placeholder="e.g., react, javascript, frontend, webdev"
            />
          </div>

          {/* Cover Image Upload and Publish Toggle - Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Cover Image Upload */}
            <div className="relative">
              <label
                htmlFor="coverImage"
                className="block text-sm font-semibold mb-2 text-gray-300"
              >
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-gray-900 hover:file:bg-cyan-600 cursor-pointer text-gray-400 py-2"
              />
              {coverImage && (
                <p className="mt-2 text-xs text-gray-500">
                  Selected: **{coverImage.name}**
                </p>
              )}
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center pt-8 md:pt-0 justify-start md:justify-end">
              <label
                htmlFor="isPublished"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ml-3 text-lg font-medium text-gray-300">
                  {form.isPublished ? "Published" : "Draft"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-lg font-bold text-gray-900 shadow-lg transition-all duration-300 transform ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-lime-500 hover:from-green-500 hover:to-lime-600 hover:scale-[1.005] active:scale-[0.99] shadow-green-900/50"
            }`}
          >
            {loading ? "Saving..." : "🚀 Save & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}