const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "BlogPost", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // for replies
  content: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
 
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
