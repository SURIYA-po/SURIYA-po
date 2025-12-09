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
    // Determine projection based on keyword presence
    if (keyword) {
        // Search Mode
        query = { 
            $text: { $search: keyword },
            isPublic: true 
        };
        // Exclude large field (e.g., description/content from your model)
        projection = { description: 0 }; 
        
    } else {
        // Full List Mode (Include the large field by default)
        query = { isPublic: true };
        projection = {}; 
    }

    // --- Execute the Mongoose Query ---
    const projects = await Project.find(query)
        .select(projection) 
        .sort(
            // CONDITIONALLY SORT: Only sort by score if a keyword was provided
            keyword ? { score: { $meta: "textScore" } } : { createdAt: -1 } 
            // If no keyword, sort by creation date descending (newest first)
        )
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

exports.getUniqueTags = async (req, res) => {
  try {
    // 1. Define the query for public projects
    const query = { isPublic: true };
    
    // 2. Use the Mongoose .distinct() method to get unique values 
    //    from the 'techStack' field based on the query.
    const uniqueTags = await Project.distinct('techStack', query);
    
    // Example Output: [ "React", "Node.js", "MongoDB", "Express", ... ]
    res.status(200).json(uniqueTags);
  } catch (error) {
    console.error("Unique Tags Retrieval Error:", error);
    res.status(500).json({ message: "Failed to retrieve unique tags." });
  }
};