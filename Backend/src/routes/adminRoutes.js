const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/adminAuth");
const adminController = require("../controllers/adminController");

// ========================
// USER ROUTES
// ========================
router.get("/users", protect, adminOnly, adminController.getAllUsers);
router.get("/users/:id", protect, adminOnly, adminController.getUserById);
router.put("/users/:id", protect, adminOnly, adminController.updateUser);
router.delete("/users/:id", protect, adminOnly, adminController.deleteUser);

// ========================
// BLOG ROUTES
// ========================
router.get("/blogs", protect, adminOnly, adminController.getAllBlogs);
router.get("/blogs/:id", protect, adminOnly, adminController.getBlogById);
router.put("/blogs/:id", protect, adminOnly, adminController.updateBlog);
router.delete("/blogs/:id", protect, adminOnly, adminController.deleteBlog);

// ========================
// PROJECT ROUTES
// ========================
router.get("/projects", protect, adminOnly, adminController.getAllProjects);
router.get("/projects/:id", protect, adminOnly, adminController.getProjectById);
router.put("/projects/:id", protect, adminOnly, adminController.updateProject);
router.delete("/projects/:id", protect, adminOnly, adminController.deleteProject);

// ========================
// DASHBOARD STATS
// ========================
router.get("/stats", protect, adminOnly, adminController.getDashboardStats);

module.exports = router;
