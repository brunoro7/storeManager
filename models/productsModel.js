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

  async addProductOnList(data) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },

  async deleteProduct(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?;';

    await db.query(sql, [id]);

    return true;
  },
};

module.exports = productsModel;
