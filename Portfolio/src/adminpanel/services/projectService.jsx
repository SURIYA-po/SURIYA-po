// src/services/projectService.js
import api from "../../api/api";

const projectService = {
  // CREATE PROJECT (with image upload)
  createProject: async (formData) => {
    return await api.post("/api/projects/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // GET ALL PROJECTS
 getProjects: async (keyword = '') => {
  let url = "/api/projects/public/";
  
  // If a keyword is provided, append it as a query parameter
  if (keyword) {
    // Example final URL: /api/projects/public/?q=react
    url = `/api/projects/public/?q=${encodeURIComponent(keyword)}`;
  }

  return await api.get(url);
},

  // GET PROJECT BY ID
  getProjectById: async (id) => {
    return await api.get(`/api/projects/${id}`);
  },

  // UPDATE PROJECT
  updateProject: async (id, formData) => {
    return await api.put(`/api/projects/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // DELETE PROJECT
  deleteProject: async (id) => {
    return await api.delete(`/api/projects/${id}/`);
  },

  // TOGGLE PROJECT VISIBILITY
  toggleProjectVisibility: async (id, isPublic) => {
    return await api.patch(`/api/projects/${id}/visibility/`, { isPublic });
  },
};

export default projectService;
