const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const blog = require("../controllers/blogController");
const upload = require("../middlewares/upload")("blogpics");

router.post("/", protect, upload.single("coverImage"), blog.createPost);
router.get("/:id",blog.getPostById);
router.get("/", blog.listPosts);

router.get("/:slug", blog.getPost);
router.post("/:id/share", blog.incrementShare); // frontend calls this when share happens

module.exports = router;
