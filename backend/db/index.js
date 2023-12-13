const mongoose = require("mongoose");
const path = require("path");

const envFilePath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envFilePath });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
