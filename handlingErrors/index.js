import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/start", (req, res) => {
  res
    .status(200)
    .send({ message: `The app is up and running at port ${PORT}🚀` });
});

app.listen(PORT, () => {
  console.log("App started 🚀🚀");
});
