import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import tryCatch from "./utils/tryCatch.js";

const PORT = process.env.PORT || 3000;
const app = express();
const userDetails = () => undefined;

app.get(
  "/login",
  tryCatch(async (req, res, next) => {
    const user = await userDetails();
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).send({ message: `Wellcome back 🤘 ${user}` });

    next(error);
  })
);

app.get("/start", (req, res) => {
  res
    .status(200)
    .send({ message: `The app is up and running at port ${PORT}🚀` });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("App started 🚀🚀");
});
