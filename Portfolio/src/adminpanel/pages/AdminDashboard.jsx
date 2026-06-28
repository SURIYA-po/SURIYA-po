import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

export default function AdminDashboard() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

useEffect(() => {
    import("../css/TailwindOnly.css");
  }, []);
  
  useEffect(() => {
    // Wait for auth context to finish loading
    if (authLoading) return;
    
    // Check if user exists and has token
    if (!user || !token) {
      navigate("/login");
      return;
    }
    
    // Load stats if user is authenticated
    loadStats();
  }, [user, token, authLoading, navigate]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      showMessage("error", "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      showMessage("error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data);
    } catch (error) {
      showMessage("error", "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      showMessage("error", "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditingId(null);
    setEditData(null);

    if (tab === "users" && users.length === 0) loadUsers();
    else if (tab === "blogs" && blogs.length === 0) loadBlogs();
    else if (tab === "projects" && projects.length === 0) loadProjects();
  };

  // ==================== USER OPERATIONS ====================

  const handleEditUser = (user) => {
    setEditingId(user._id);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleSaveUser = async () => {
    try {
      await api.put(`/api/admin/users/${editingId}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showMessage("success", "User updated successfully");
      setEditingId(null);
      loadUsers();
    } catch (error) {
      showMessage("error", "Failed to update user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showMessage("success", "User deleted successfully");
        loadUsers();
      } catch (error) {
        showMessage("error", "Failed to delete user");
      }
    }
  };

  // ==================== BLOG OPERATIONS ====================

  const handleEditBlog = (blog) => {
    setEditingId(blog._id);
    setEditData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags.join(", "),
      isPublished: blog.isPublished,
    });
  };

  const handleSaveBlog = async () => {
    try {
      await api.put(
        `/api/admin/blogs/${editingId}`,
        {
          ...editData,
          tags: editData.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showMessage("success", "Blog updated successfully");
      setEditingId(null);
      loadBlogs();
    } catch (error) {
      showMessage("error", "Failed to update blog");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await api.delete(`/api/admin/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showMessage("success", "Blog deleted successfully");
        loadBlogs();
      } catch (error) {
        showMessage("error", "Failed to delete blog");
      }
    }
  };

  // ==================== PROJECT OPERATIONS ====================

  const handleEditProject = (project) => {
    setEditingId(project._id);
    setEditData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      isPublic: project.isPublic,
    });
  };

  const handleSaveProject = async () => {
    try {
      await api.put(
        `/api/admin/projects/${editingId}`,
        {
          ...editData,
          techStack: editData.techStack.split(",").map((t) => t.trim()),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showMessage("success", "Project updated successfully");
      setEditingId(null);
      loadProjects();
    } catch (error) {
      showMessage("error", "Failed to update project");
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await api.delete(`/api/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showMessage("success", "Project deleted successfully");
        loadProjects();
      } catch (error) {
        showMessage("error", "Failed to delete project");
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Show loading while checking auth */}
      {authLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-400">Loading...</div>
        </div>
      )}

      {!authLoading && (!user || !token) && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-red-400">Redirecting to login...</div>
        </div>
      )}

      {!authLoading && user && token && (
        <>
          {/* Navbar */}
          <nav className="border-b border-gray-800 bg-black/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </nav>

          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Message Alert */}
            {message.text && (
              <div
                className={`mb-4 p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-900/30 border border-green-700 text-green-300"
                    : "bg-red-900/30 border border-red-700 text-red-300"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 border-b border-gray-800 overflow-x-auto pb-4">
              <button
                onClick={() => handleTabChange("stats")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "stats"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4v8H3v-8zm6-6h4v14H9V7zm6 9h4v5h-4v-5z" />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => handleTabChange("users")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "users"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </button>
              <button
                onClick={() => handleTabChange("blogs")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "blogs"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Blogs
              </button>
              <button
                onClick={() => handleTabChange("projects")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === "projects"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Projects
              </button>
            </div>

            {/* STATS TAB */}
            {activeTab === "stats" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
                  <div className="text-gray-300 text-sm mb-2">Total Users</div>
                  <div className="text-4xl font-bold">{stats?.totalUsers || 0}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
                  <div className="text-gray-300 text-sm mb-2">Total Blogs</div>
                  <div className="text-4xl font-bold">{stats?.totalBlogs || 0}</div>
                  <div className="text-sm text-gray-300 mt-2">
                    {stats?.publishedBlogs} published
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
                  <div className="text-gray-300 text-sm mb-2">Total Projects</div>
                  <div className="text-4xl font-bold">{stats?.totalProjects || 0}</div>
                  <div className="text-sm text-gray-300 mt-2">
                    {stats?.publicProjects} public
                  </div>
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === "users" && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={loadUsers}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Load Users
                  </button>
                </div>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="bg-gray-900 border border-gray-800 p-6 rounded-lg"
                    >
                      {editingId === user._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-2">Name</label>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({ ...editData, name: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Email</label>
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) =>
                                setEditData({ ...editData, email: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Role</label>
                            <select
                              value={editData.role}
                              onChange={(e) =>
                                setEditData({ ...editData, role: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveUser}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-gray-400 text-sm">{user.email}</div>
                            <div className="text-gray-500 text-xs mt-2">
                              Role: <span className="capitalize">{user.role}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOGS TAB */}
            {activeTab === "blogs" && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={loadBlogs}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Load Blogs
                  </button>
                </div>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-gray-900 border border-gray-800 p-6 rounded-lg"
                    >
                      {editingId === blog._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-2">Title</label>
                            <input
                              type="text"
                              value={editData.title}
                              onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Content</label>
                            <textarea
                              value={editData.content}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  content: e.target.value,
                                })
                              }
                              rows="4"
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Excerpt</label>
                            <input
                              type="text"
                              value={editData.excerpt}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  excerpt: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">
                              Tags (comma separated)
                            </label>
                            <input
                              type="text"
                              value={editData.tags}
                              onChange={(e) =>
                                setEditData({ ...editData, tags: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editData.isPublished}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  isPublished: e.target.checked,
                                })
                              }
                              className="w-4 h-4"
                            />
                            <label className="ml-2 text-sm">Published</label>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveBlog}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold">{blog.title}</div>
                            <div className="text-gray-400 text-sm mt-2 line-clamp-2">
                              {blog.excerpt || blog.content}
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                              By {blog.author?.name || "Unknown"} |{" "}
                              {blog.isPublished ? (
                                <span className="text-green-400">Published</span>
                              ) : (
                                <span className="text-yellow-400">Draft</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditBlog(blog)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={loadProjects}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 transition"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Load Projects
                  </button>
                </div>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-gray-900 border border-gray-800 p-6 rounded-lg"
                    >
                      {editingId === project._id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm mb-2">Title</label>
                            <input
                              type="text"
                              value={editData.title}
                              onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Description</label>
                            <textarea
                              value={editData.description}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  description: e.target.value,
                                })
                              }
                              rows="3"
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            ></textarea>
                          </div>
                          <div>
                            <label className="block text-sm mb-2">
                              Tech Stack (comma separated)
                            </label>
                            <input
                              type="text"
                              value={editData.techStack}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  techStack: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Repository URL</label>
                            <input
                              type="url"
                              value={editData.repoUrl}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  repoUrl: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Live URL</label>
                            <input
                              type="url"
                              value={editData.liveUrl}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  liveUrl: e.target.value,
                                })
                              }
                              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editData.isPublic}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  isPublic: e.target.checked,
                                })
                              }
                              className="w-4 h-4"
                            />
                            <label className="ml-2 text-sm">Public</label>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveProject}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold">{project.title}</div>
                            <div className="text-gray-400 text-sm mt-2 line-clamp-2">
                              {project.description}
                            </div>
                            <div className="text-gray-500 text-xs mt-2 flex flex-wrap gap-2">
                              {project.techStack?.map((tech, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-800 px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                              By {project.owner?.name || "Unknown"} |{" "}
                              {project.isPublic ? (
                                <span className="text-green-400">Public</span>
                              ) : (
                                <span className="text-yellow-400">Private</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="p-2 bg-red-600 hover:bg-red-700 rounded transition"
                            >
                              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}