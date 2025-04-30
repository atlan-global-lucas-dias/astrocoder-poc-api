const express = require("express");
const { Activity } = require("../schemas/activity");
const { default: mongoose } = require("mongoose");

const ActivitiesRouter = express.Router();

ActivitiesRouter.get("/", async (req, res) => {
  const activities = await Activity.find({}).lean();
  return res.json(activities);
});

ActivitiesRouter.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  const findObj = {};

  if (_id) {
    findObj._id = _id;
  }
  const activity = await Activity.findOne(findObj).lean();
  return res.json(activity);
});

ActivitiesRouter.post("/", async (req, res) => {
  const { _id } = req.body;
  const activity = await Activity.findOneAndUpdate(
    { _id: _id ?? new mongoose.Types.ObjectId() },
    req.body,
    { upsert: true, new: true }
  );
  return res.json(activity);
});

ActivitiesRouter.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  const activity = await Activity.deleteOne({ _id });
  return res.json(activity);
});

module.exports = { ActivitiesRouter };
