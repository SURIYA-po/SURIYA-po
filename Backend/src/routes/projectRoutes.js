const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const projectController = require("../controllers/projectController");

const upload = require("../middlewares/upload");

router.post("/", protect,upload().single("image"), projectController.createProject);
router.get("/me", protect, projectController.getMyProjects);
router.get("/public/", projectController.getPublicProjects);
router.get("/tags",projectController.getUniqueTags)
router.get("/:id",projectController.getProjectById)

router.put("/:id", protect, projectController.updateProject);
router.delete("/:id", protect, projectController.deleteProject);

module.exports = router;

