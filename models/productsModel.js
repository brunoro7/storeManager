const db = require('./db');

const productsModel = {
  async getProductsList() {
    const sql = 'SELECT * FROM StoreManager.products;';
    const [productsList] = await db.query(sql);

    return productsList;
  },
  async getProductById(id) {
    const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [productsList] = await db.query(sql, [id]);

    return productsList;
  },
};

module.exports = productsModel;