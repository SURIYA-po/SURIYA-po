import React, { useState, useEffect } from "react";
// import "../css/ProjectForm.css"; // We are replacing this with Tailwind classes
import projectService from "../services/projectService";
export default function ModernProjectForm() {
     useEffect(() => {
        // In a real project, you would ensure Tailwind CSS is properly imported/configured
        import("../css/TailwindOnly.css");
      }, []);

    // State initialization is kept identical
    const [form, setForm] = useState({
        title: "",
        description: "",
        techStack: [],
        techInput: "",
        repoUrl: "",
        liveUrl: "",
        image: null, // Change to null for file object
        isPublic: true,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Minor adjustment to handle text/url changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    
    // Handle file change separately
    const handleImageChange = (e) => {
        setForm({ ...form, image: e.target.files[0] });
    };
    
    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setForm({ ...form, isPublic: e.target.checked });
    };

    // Add tech stack item (kept identical)
    const addTech = (e) => {
        e.preventDefault();
        if (form.techInput.trim() !== "") {
            setForm({
                ...form,
                techStack: [...form.techStack, form.techInput.trim(",")],
                techInput: "",
            });
        }
    };

    // Remove tech stack item (kept identical)
    const removeTech = (tech) => {
        setForm({
            ...form,
            techStack: form.techStack.filter((t) => t !== tech),
        });
    };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("repoUrl", form.repoUrl);
    data.append("liveUrl", form.liveUrl);
    data.append("isPublic", form.isPublic);

    // Append image if present
    if (form.image) {
      data.append("image", form.image);
    }

    // Append techStack array
    form.techStack.forEach((t) => data.append("techStack[]", t));

    // Make API call
    const response = await projectService.createProject(data);

    // Log form data for debugging
    console.log("Project FormData:", Object.fromEntries(data.entries()));

    // Success message
    setSuccess(`Project '${form.title}' submitted successfully!`);

    // Optionally, reset the form
    // setForm({ title: "", description: "", repoUrl: "", liveUrl: "", isPublic: true, image: null, techStack: [] });

  } catch (err) {
    console.error("Error saving project:", err);
    setError("Failed to save project.");
  } finally {
    setLoading(false);
  }
};

    return (
        // The main container and card styling matches the blog form
        <div className="min-h-screen flex items-start justify-center bg-gray-950 p-6 md:p-12">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data" // Required for file uploads
                className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 text-white"
            >
                {/* Header Section */}
                <header className="mb-10 border-b border-gray-700 pb-4">
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
                        Project Portfolio Creator 💡
                    </h2>
                    <p className="text-gray-400 mt-1">
                        Showcase your latest work to the world.
                    </p>
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
                    <div className="input-group">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Project Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition duration-200 placeholder-gray-500 text-lg"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="input-group">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition duration-200 resize-y placeholder-gray-500"
                            placeholder="Short description of the project"
                        ></textarea>
                    </div>

                    {/* Tech Stack */}
                    <div className="input-group">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Tech Stack
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="techInput"
                                value={form.techInput}
                                onChange={handleChange}
                                className="flex-grow px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition duration-200 placeholder-gray-500"
                                placeholder="Add tech (React, Node, etc)"
                            />
                            <button className="flex-shrink-0 px-4 py-2 rounded-xl text-lg font-bold text-gray-900 bg-fuchsia-500 hover:bg-fuchsia-600 transition duration-150" onClick={addTech}>
                                + Add
                            </button>
                        </div>

                        {/* Tech Stack Display */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {form.techStack.map((tech, idx) => (
                                <span key={idx} className="px-3 py-1 bg-fuchsia-800/50 text-fuchsia-200 rounded-full text-sm font-medium cursor-pointer hover:bg-fuchsia-800 transition duration-150" onClick={() => removeTech(tech)}>
                                    {tech} <span className="font-bold ml-1">×</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* URLs - Grid layout for horizontal grouping */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* GitHub Repository URL */}
                        <div className="input-group">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">
                                GitHub Repository URL
                            </label>
                            <input
                                type="text"
                                name="repoUrl"
                                value={form.repoUrl}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition duration-200 placeholder-gray-500"
                                placeholder="https://github.com/username/repo"
                            />
                        </div>

                        {/* Live Project URL */}
                        <div className="input-group">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">
                                Live Project URL
                            </label>
                            <input
                                type="text"
                                name="liveUrl"
                                value={form.liveUrl}
                                onChange={handleChange}
                                className="w-full px-5 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition duration-200 placeholder-gray-500"
                                placeholder="https://yourproject.vercel.app"
                            />
                        </div>
                    </div>
                    
                     {/* Image and Public Toggle - Grouped */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {/* Project Image Upload */}
                        <div className="input-group">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">
                                Project Image
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-fuchsia-500 file:text-gray-900 hover:file:bg-fuchsia-600 cursor-pointer text-gray-400 py-2"
                            />
                            {form.image && (
                                <p className="mt-2 text-xs text-gray-500">
                                    Selected: **{form.image.name}**
                                </p>
                            )}
                        </div>

                        {/* Public Toggle */}
                        <div className="flex items-center pt-8 md:pt-0 justify-start md:justify-end">
                            <label htmlFor="isPublic" className="inline-flex relative items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isPublic"
                                    id="isPublic"
                                    checked={form.isPublic}
                                    onChange={handleCheckboxChange}
                                    className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-fuchsia-300 dark:peer-focus:ring-fuchsia-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-fuchsia-600"></div>
                                <span className="ml-3 text-lg font-medium text-gray-300">
                                    {form.isPublic ? "Public" : "Private"}
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
                                : "bg-gradient-to-r from-purple-400 to-fuchsia-500 hover:from-purple-500 hover:to-fuchsia-600 hover:scale-[1.005] active:scale-[0.99] shadow-fuchsia-900/50"
                        }`}
                    >
                        {loading ? "Saving..." : "💾 Save Project"}
                    </button>
                </div>
            </form>
        </div>
    );
}