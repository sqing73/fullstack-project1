const CustomAPIError = require("../errors");

const errorHandleMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res
    .status(err.statusCode || 500)
    .json({ message: err.message || "Something went wrong, please try again" });
};

module.exports = errorHandleMiddleware;
