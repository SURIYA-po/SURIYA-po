const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { title, description, techStack, repoUrl, liveUrl, isPublic } = req.body;
 let projectImage = null;
    if (req.file) {
      projectImage = `${req.protocol}://${req.get("host")}/uploads/projectpics/${req.file.filename}`;
    }
  const data = {
    owner: req.user._id,
    title,
    description,
    techStack,
    repoUrl,
    liveUrl,
    isPublic,
    image: projectImage
  };
  const project = await Project.create(data);
  res.status(201).json(project);
};

exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  res.json(projects);
};
exports.getProjectById = async (req, res) =>{
  const project = await Project.find({_id:req.params.id});
  res.json(project);
}

exports.getPublicProjects = async (req, res) => {
  const keyword = req.query.q; 
    let query = { isPublic: true }; // Base query to get public items
    let projection = {}; // Initialize an empty projection object

    try {
        if (keyword) {
            // 1. Keyword IS present (Search Mode)
            
            // Set the search query using the Text Index
            query = { 
                $text: { $search: keyword },
                isPublic: true 
            };
            
            // Exclude the large 'content' field to reduce payload size 
            // since only search snippets/excerpts are needed.
            // Using '-' prefixes fields to exclude.
            projection = { content: 0 }; 
            
        } else {
            // 2. Keyword IS NOT present (Full List Mode)
            
            // Include the large 'content' field. 
            // You can explicitly set it to 1, or just leave 'projection' as {} 
            // and the content field will be included by default, 
            // but setting it to {} is explicit and clearer.
            projection = {}; 
            // Note: If you have a different large field name (e.g., 'description'), use that instead.
        }

        // --- Execute the Mongoose Query ---
        const projects = await Project.find(query)
            .select(projection) // Apply the conditional projection
            .lean(); 

        res.status(200).json(projects);

    } catch (error) {
        console.error("Project List/Search Error:", error);
        res.status(500).json({ message: "Failed to retrieve data." });
    }
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true });
  if (!project) return res.status(404).json({ message: "Project not found or not yours" });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!project) return res.status(404).json({ message: "Project not found or not yours" });
  res.json({ message: "Deleted" });
};
