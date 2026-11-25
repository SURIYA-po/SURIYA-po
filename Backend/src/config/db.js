const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
