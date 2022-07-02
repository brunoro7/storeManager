// const Joi = require('joi');
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

  async addProduct(data) {
    const id = await productsModel.addProductOnList(data);
    return id;
  },

  async validateBodyAdd(value) {
    // esta comentado para depois achar o meio de vincular ambos!
    // const schema = Joi.object({
    //   name: Joi.string().required().min(5).message({
    //     'required.base': '"name" is required',
    //   }),
    // });
    // const result = await schema.validateAsync(value);
    // return result;
    // },
    const { name } = value;
    
    if (!name || name === '') {
      const error = new Error('"name" is required');
      error.name = 'NameRequired';
      throw error;
    }
    if (String(name).length < 5) {
      const error = new Error('"name" length must be at least 5 characters long');
      error.name = 'NameLength';
      throw error;
    }
    return value;
  },
};

module.exports = productsService;
