const User = require("../models/User");
const BlogPost = require("../models/BlogPost");
const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

// ========================
// USER MANAGEMENT
// ========================

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Delete user's projects and blogs
    await Project.deleteMany({ owner: req.params.id });
    await BlogPost.deleteMany({ author: req.params.id });
    
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// ========================
// BLOG MANAGEMENT
// ========================

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, tags, isPublished } = req.body;
    const blog = await BlogPost.findById(req.params.id);
    
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;
    blog.tags = tags || blog.tags;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;

    await blog.save();
    const updatedBlog = await BlogPost.findById(req.params.id).populate("author", "name email");
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    
    // Delete cloudinary image if exists
    if (blog.public_id) {
      await cloudinary.uploader.destroy(blog.public_id);
    }
    
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

// ========================
// PROJECT MANAGEMENT
// ========================

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("owner", "name email");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, techStack, repoUrl, liveUrl, isPublic } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, techStack, repoUrl, liveUrl, isPublic },
      { new: true, runValidators: true }
    ).populate("owner", "name email");
    
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    
    // Delete cloudinary image if exists
    if (project.public_id) {
      await cloudinary.uploader.destroy(project.public_id);
    }
    
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};

// ========================
// STATISTICS
// ========================

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await BlogPost.countDocuments();
    const totalProjects = await Project.countDocuments();
    const publishedBlogs = await BlogPost.countDocuments({ isPublished: true });
    const publicProjects = await Project.countDocuments({ isPublic: true });

    res.json({
      totalUsers,
      totalBlogs,
      publishedBlogs,
      totalProjects,
      publicProjects,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};
