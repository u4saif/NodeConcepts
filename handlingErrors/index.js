import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import tryCatch from "./utils/tryCatch.js";
import Joi from "joi";
import AppError from "./utils/AppError.js";
import  {SUBSCRIPTION_NOT_VALID}  from "./constants/constantErrorCode.js";
const PORT = process.env.PORT || 3000;
const app = express();
const userDetails = () => undefined;
const getSucription = () => undefined;
const schema = Joi.object({
  userId: Joi.number().required(),
});

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

app.post(
  "/login",
  tryCatch(async (req, res) => {
    const user = await userDetails();
    // const { error, value } = schema.validate({});
    // if (error) throw error;
    const subscription = getSucription();
    if (!subscription)
      throw new AppError(
        SUBSCRIPTION_NOT_VALID,
        "subscription not found",
        400
      );
    res.status(200).send({ message: `Wellcome back 🤘 ${user}` });
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
