import express from "express";

const PORT = process.env.port || 3000;
const app = express();
const computeData = () => {
  let count = 0;
  for (let i = 0; i < 20_000_000; i++) {
    count += 1;
  }
  return count;
};
app.get("/compute", (req, res) => {
  // console.log(req.query);
  let largeNum = computeData();
  res.status(200).send({ message: "Hello from NODE cluster", data: largeNum });
});

app.listen(PORT, () => {
  console.log(
    `Server started at PORT ${PORT} 🚀🚀🚀 with Process ID ${process.pid}🚀`
  );
});
