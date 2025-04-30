const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./lib/mongoose");
const { ActivitiesRouter } = require("./routes/activity");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/activity", ActivitiesRouter);

connectMongoDB()
  .then(() => {
    app.listen(3030, () => console.log("Running on port 3030"));
  })
  .catch((err) => console.error(err));
