// src/services/blogService.js
import api from "../../api/api";

const blogService = {
  // CREATE BLOG POST (with image upload)
  createBlog: async (formData) => {
    return await api.post("/api/blogs/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      credentials:"include",
    });
  },

  // GET ALL BLOGS
  getBlogs: async () => {
    return await api.get("/api/blogs/");
  },

  // GET BLOG BY ID
  getBlogById: async (id) => {
    return await api.get(`/api/blogs/${id}`);
  },

  // UPDATE BLOG (title, content, file, tags, etc.)
  updateBlog: async (id, formData) => {
    return await api.put(`/api/blogs/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // DELETE BLOG
  deleteBlog: async (id) => {
    return await api.delete(`/api/blogs/${id}/`);
  },

  // PUBLISH / UNPUBLISH BLOG
  togglePublish: async (id, isPublished) => {
    return await api.patch(`/api/blogs/${id}/publish/`, { isPublished });
  },

  // INCREMENT LIKES
  likeBlog: async (id) => {
    return await api.post(`/api/blogs/${id}/like/`);
  },

  // INCREMENT SHARES
  shareBlog: async (id) => {
    return await api.post(`/api/blogs/${id}/share/`);
  },
};

export default blogService;
