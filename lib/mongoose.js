const mongoose = require("mongoose");

exports.connectMongoDB = async function () {
  console.log("Connecting to mongodb...");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected successfully.");
};
