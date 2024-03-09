const express = require("express");
const { Worker } = require("worker_threads");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/noblocking", (req, res) => {
  res.status(200).send({ message: "Data comming from Non Blocking" });
});

app.get("/blocking", (req, res) => {
  let workThread = new Worker("./workerThread.js");
  workThread.on("message", (data) => {
    res.status(200).send({ message: "Data comming from Blocking", data: data });
  });

  workThread.on("error", (data) => {
    res
      .status(500)
      .send({ message: "Error comming from Blocking", data: data });
  });
});

app.listen(PORT, () => {
  console.log("🚀🚀App listening on Port:", PORT, "🚀🚀");
});
