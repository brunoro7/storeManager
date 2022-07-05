const errorHandlerMiddleware = (err, _req, res, _next) => {
  switch (err.name) {
    case 'NotFound':
      res.status(404).json({ message: err.message });
      break;
    case 'NameRequired':
      res.status(400).json({ message: err.message });
      break;
    case 'NameLength':
      res.status(422).json({ message: err.message });
      break;
    // case 'SaleNotFound':
    //   res.status(404).json({ message: err.message });
    //   break;
    default:
      res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandlerMiddleware;
