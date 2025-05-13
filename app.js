require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./lib/mongoose");
const { ActivitiesRouter } = require("./routes/activity");
const { LevelRouter } = require("./routes/level");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/activity", ActivitiesRouter);
app.use("/level", LevelRouter);

connectMongoDB()
  .then(() => {
    app.listen(process.env.PORT ?? 3030, () => console.log("Running on port " + process.env.PORT));
  })
  .catch((err) => console.error(err));
