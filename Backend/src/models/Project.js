const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  repoUrl: String,
  liveUrl: String,
  image: String,
  isPublic: { type: Boolean, default: true },
  public_id: { type: String, required: false }
}, { timestamps: true });

// --- ADD THE TEXT INDEX HERE ---
projectSchema.index(
    {
        // 1. Fields to search (The indexed fields)
        title: 'text',
        description: 'text',
        techStack: 'text'
    },
    {
        // 2. Weights for relevance ranking
        weights: {
            title: 10,       // Matches in the title are 10x more relevant
            techStack: 5,    // Tech stack matches are 5x more relevant
            description: 1   // Description matches are the baseline
        },
        name: 'ProjectSearchIndex' // Optional: Name the index
    }
);
// -------------------------------

module.exports = mongoose.model("Project", projectSchema);