const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
const productsService = require('../services/productsService');

const productRoute = Router();

productRoute.get('/', productsControllers.getProducts);

productRoute.get('/:id', productsControllers.getProduct);

productRoute.post('/', async (req, res) => {
  // validar o body
  const data = await productsService.validateBodyAdd(req.body);

  // adicionar o product
  const id = await productsService.addProduct(data);

  // retornar o product
  const product = await productsService.getById(id);

  res.status(201).json(product);
});

module.exports = productRoute;