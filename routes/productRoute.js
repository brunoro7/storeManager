const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
// const productsService = require('../services/productsService');

const productRoute = Router();

productRoute.get('/', productsControllers.getProducts);

productRoute.get('/:id', productsControllers.getProduct);

productRoute.post('/', productsControllers.addNewProduct);

module.exports = productRoute;