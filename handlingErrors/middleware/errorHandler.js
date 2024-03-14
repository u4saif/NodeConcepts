import AppError from "../utils/AppError.js";

const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }

  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message:error.message
    });
  }
  return res.status(400).send({ message: error.message });
};

export default errorHandler;
