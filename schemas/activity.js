const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["block"], required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const CategorySchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["category", "block"], required: true },
    type: { type: String },
    name: { type: String },
    colour: { type: String },
    contents: [BlockSchema],
    custom: { type: String },
  },
  { _id: false }
);

const ToolboxSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ["categoryToolbox", "flyoutToolbox"],
    required: true,
  },
  contents: [CategorySchema],
});

const GridEntitySchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  imgSrc: String,
});

const LevelSchema = new mongoose.Schema({
  gridSize: { type: Number, default: 8 },
  gridBgImg: String,
  player: GridEntitySchema,
  goals: [GridEntitySchema],
  npcs: [GridEntitySchema],
  blockers: [GridEntitySchema],
});

const ActivitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    activityType: {
      type: String,
      enum: ["championship", "free", "grade", "school_year"],
      default: "free",
    },
    color: {
      type: String,
      enum: ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500"],
      default: "bg-red-500",
    },
    toolbox: {
      type: ToolboxSchema,
      required: true,
    },
    levels: {
      type: [LevelSchema],
      required: true,
    },
  },
  { timestamps: true }
);

exports.Activity =
  mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);
