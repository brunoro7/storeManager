const { Router } = require('express');
const productsControllers = require('../controllers/productsControllers');
// const productsService = require('../services/productsService');

const productRoute = Router();

productRoute.get('/', productsControllers.getProducts);

productRoute.get('/:id', productsControllers.getProduct);

// productRoute.get('/:id', async (req, res) => {
//   const product = await productsService.getById(req.params.id);
//   res.status(200).json(product);
// });

module.exports = productRoute;