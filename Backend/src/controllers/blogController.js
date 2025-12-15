const BlogPost = require("../models/BlogPost");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");
exports.createPost = async (req, res) => {
  try { 
    console.log("user is ", req.user);
    const { title, content, excerpt, tags, isPublished } = req.body;

    // -----------------------------
    // Basic validation
    // -------------------------------
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    // -----------------------------
    // Generate slug
    // -----------------------------
    const slug = slugify(title, { lower: true, strict: true });

    let uniqueSlug = slug;
    let attempts = 0;

    while (await BlogPost.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${Date.now()}`;
      attempts++;

      if (attempts > 5) {
        return res.status(500).json({
          message: "Failed to generate a unique slug. Try again.",
        });
      }
    }

    // -----------------------------
    // Handle image upload
    // -----------------------------
    let coverImageUrl = null;
   if (req.file) {
  try {
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "blogpics",
      }
    );

    coverImageUrl = result.secure_url;
    public_id = result.public_id;
  } catch (imgError) {
    return res.status(500).json({
      message: "Image upload to Cloudinary failed.",
      error: imgError.message,
    });
  }
}
    // -----------------------------
    // Create blog post
    // -----------------------------
    const post = await BlogPost.create({
      author: req.user?._id,
      title,
      slug: uniqueSlug,
      content,
      excerpt,
      tags,
      coverImage: coverImageUrl,
      isPublished: isPublished ?? false,
      public_id:public_id
    });

    return res.status(201).json(post);

  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({
      message: "Server error while creating blog post.",
      error: error.message,
    });
  }
};


exports.getPost = async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug }).populate("author", "name email");
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};
exports.getPostById = async (req, res) =>{
  const post = await BlogPost.findOne({_id:req.params.id}).populate("author","name email");
   if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
}

exports.listPosts = async (req, res) => {
  const { page = 1, limit = 10, tag, author } = req.query;
  const filter = { isPublished: true };
  if (tag) filter.tags = tag;
  if (author) filter.author = author;

  const posts = await BlogPost.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate("author", "name");
  res.json(posts);
};

exports.incrementShare = async (req, res) => {
  const post = await BlogPost.findByIdAndUpdate(req.params.id, { $inc: { shares: 1 } }, { new: true });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
};
