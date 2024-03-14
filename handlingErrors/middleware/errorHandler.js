const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
      res.status(400).send({ 
        type: "ValidationError",
        details: error.details });
  }
  res.status(400).send({ message: error.message });
};

export default errorHandler;
