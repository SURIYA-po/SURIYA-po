const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // generate from title
  content: { type: String, required: true },
  excerpt: String,
  tags: [String],
  coverImage: String,
  isPublished: { type: Boolean, default: false },
  shares: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  public_id:{type:String,required:false}
}, { timestamps: true });

module.exports = mongoose.model("BlogPost", blogSchema);
