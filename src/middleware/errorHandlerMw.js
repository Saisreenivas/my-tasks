const CustomError = require("../utils/CustomError");

function ErrorHandlerMw(error, req, res, next) {
  if (error) {
    console.error(error);
    if (error instanceof CustomError)
      return res.status(error.status).json({ message: error.message });

    return res.status(500).json({ message: 'Internal server error' });
  }
  next();
}

module.exports = ErrorHandlerMw;