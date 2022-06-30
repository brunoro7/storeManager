const productsService = require('../services/productsService');

const productsControllers = {
  async getProducts(_req, res) {
    const products = await productsService.getProducts();
    res.status(200).json(products);
  },
};

module.exports = productsControllers;