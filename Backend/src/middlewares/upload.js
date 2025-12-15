const multer = require("multer");

// ✅ Memory storage (NO disk usage)
const createUploader = () => {
  const storage = multer.memoryStorage();

  return multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
  });
};

module.exports = createUploader;
