const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
// const productsService = require('../services/productsService');

const productRoute = Router();

productRoute.delete('/:id', productsControllers.deleteProduct);

productRoute.put('/:id', productsControllers.updateProduct);

productRoute.get('/:id', productsControllers.getProduct);

productRoute.get('/', productsControllers.getProducts);

productRoute.post('/', productsControllers.addNewProduct);

module.exports = productRoute;
