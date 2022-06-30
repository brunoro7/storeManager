const productsModel = require('../models/productsModel');

const productsService = {
  async getProducts() {
    const productsList = await productsModel.getProductsList();
    return productsList;
  },
  async getById(id) {
    const productById = await productsModel.getProductById(id);
    const product = productById[0];
    if (!product) {
      const error = new Error('Product not found');
      error.name = 'NotFound';
      throw error;
    }
    return product;
  },
};

module.exports = productsService;