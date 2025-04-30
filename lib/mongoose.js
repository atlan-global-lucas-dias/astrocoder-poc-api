const mongoose = require("mongoose");

exports.connectMongoDB = async function () {
  console.log("Connecting to mongodb...");
  await mongoose.connect("mongodb://localhost:27017/astrocoder-poc");
  console.log("Connected successfully.");
};
