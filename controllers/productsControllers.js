const productsService = require('../services/productsService');

const productsControllers = {
  async getProducts(_req, res) {
    const products = await productsService.getProducts();
    res.status(200).json(products);
  },
  async getProduct(req, res) {
    const product = await productsService.getById(req.params.id);
    res.status(200).json(product);
  },
};

module.exports = productsControllers;