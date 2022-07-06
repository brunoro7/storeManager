const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const db = require('../../../models/db');

describe('models/productsModel', () => {
  beforeEach(sinon.restore);

  describe('getProductsList', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.getProductsList()).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne uma lista vazia;', () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(productsModel.getProductsList()).to.eventually.be.undefined;
    });

    it('3- Deve retornar uma lista de item com "id" e "name";', async () => {
      const productsList = [{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }];
      
      sinon.stub(db, 'query').resolves(productsList);

      const result = await productsModel.getProductsList();
      // chai.expect(result).to.be.instanceOf(Array);

      return chai.expect(result).to.be.deep.equal({ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' });
    });
  });

  describe('getProductById', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.getProductById(0)).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne uma lista vazia;', () => {
      sinon.stub(db, 'query').resolves([]);
      return chai.expect(productsModel.getProductById(0)).to.eventually.be.undefined;
    });

    it('3- Deve retornar um objeto, caso o db.query responda um objeto;', async () => {
      sinon.stub(db, 'query').resolves([{}]);

      return chai.expect(await productsModel.getProductById(0)).to.deep.equal({});
    });
  });

  describe('addProductOnList', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.addProductOnList({})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne um objeto vazio;', () => {
      sinon.stub(db, 'query').resolves([{}]);
      return chai.expect(productsModel.addProductOnList(0)).to.eventually.be.undefined;
    });

    it('3- Deve retornar um "id";', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 1 }]);

      return chai.expect(productsModel.addProductOnList({})).to.eventually.equal(1);
    });
  });

  describe('deleteProduct', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects();
      return chai.expect(productsModel.deleteProduct()).to.eventually.be.rejected;
    });
    
    it('2- Deve retornar "true" caso productsModel.deleteProduct não dispare nenhum erro', () => {
      sinon.stub(db, 'query').resolves();

      return chai.expect(productsModel.deleteProduct()).to.eventually.equal(true);
    });
  });
});
