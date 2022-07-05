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
  async addNewProduct(req, res) {
    // validar o body
    const data = await productsService.validateBodyAdd(req.body);
    // adicionar o product
    const id = await productsService.addProduct(data);
    // retornar o product
    const product = await productsService.getById(id);

    res.status(201).json(product);
  },
  async deleteProduct(req, res) {
    await productsService.getById(req.params.id);
    await productsService.deleteProduct(req.params.id);

    res.status(204).json();
  },
};

module.exports = productsControllers;