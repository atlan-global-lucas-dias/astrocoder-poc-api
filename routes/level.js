const express = require("express");
const { Activity } = require("../schemas/activity");
const { default: mongoose, Types } = require("mongoose");

const LevelRouter = express.Router();

LevelRouter.get("/", async (req, res) => {
  const { levelId, activityId } = req.query;
  console.log({ levelId, activityId });
  const activity = await Activity.aggregate([
    { $match: { _id: new Types.ObjectId(activityId) } },
    { $unwind: "$levels" },
    { $match: { "levels._id": new Types.ObjectId(levelId) } },
    { $project: { _id: 0, level: "$levels" } },
  ]);
  return res.json(activity?.[0] ?? null);
});

module.exports = { LevelRouter };
