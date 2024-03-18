import express from "express";
import Bull from "bull";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
const app = express();

//TO READ THE REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
};

// DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);

//Stor Processed Data
const processedItems = [];

app.get("/queue", async (req, res) => {
  res.status(200).send({
    message: "Please load your Data for processing.",
    data: {
      processedItems: processedItems,
      message: "Items processed Till now.",
    },
  });
});

app.post("/process", (req, res) => {
  //ADD JOB TO THE QUEUE
  const { inventory } = req.body;
  console.log(inventory);
  burgerQueue.add(inventory);
  res.status(200).send({
    message: "Please wait loading your inventory.",
  });
});

// REGISTER PROCESSER
burgerQueue.process((payload, done) => {
  console.log("Preparing the burger!");
  setTimeout(() => {
    console.log("Burger ready!",payload.data);
    processedItems.push(payload.data);
    done();
  }, 10000);
});

app.listen(PORT, () => {
  console.log("App is running at PORT: 🚀", PORT);
});

// //ADD JOB TO THE QUEUE
// burgerQueue.add({
//   bun: "🍔",
//   cheese: "🧀",
//   toppings: ["🍅", "🫒", "🥒", "🌶️"],
// });
