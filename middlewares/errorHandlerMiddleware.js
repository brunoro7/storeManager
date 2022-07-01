const errorHandlerMiddleware = (err, _req, res, _next) => {
  switch (err.name) {
    case 'NotFound':
      res.status(404).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandlerMiddleware;