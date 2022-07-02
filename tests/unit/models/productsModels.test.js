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
      sinon.stub(db, 'query').rejects;
      chai.expect(productsModel.getProductsList()).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne uma lista vazia;', () => {
      sinon.stub(db, 'query').resolves([{ id: 1, name: 'teste'}]);
      chai.expect(productsModel.getProductsList()).to.eventually.be.undefined;
    });

    it('3- Deve retornar uma lista de item com "id" e "name";', async () => {
      const productsList = [{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }];
      
      sinon.stub(db, 'query').resolves(productsList);

      const result = await productsModel.getProductsList();
      // chai.expect(result).to.be.instanceOf(Array);

      chai.expect(result).to.be.deep.equal({ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' });
    });
  });

  describe('getProductById', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects;
      chai.expect(productsModel.getProductById(0)).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne uma lista vazia;', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(productsModel.getProductById(0)).to.eventually.be.undefined;
    });

    it('3- Deve retornar um objeto, caso o db.query responda um objeto;', async () => {
      sinon.stub(db, 'query').resolves([{}]);

      chai.expect(await productsModel.getProductById(0)).to.deep.equal({});
    });
  });

  describe('addProductOnList', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(db, 'query').rejects;
      chai.expect(productsModel.addProductOnList(0)).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso retorne um objeto vazio;', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(productsModel.addProductOnList(0)).to.eventually.be.undefined;
    });

    it('3- Deve retornar um objeto, caso o db.query responda um objeto;', async () => {
      sinon.stub(db, 'query').resolves([{}]);

      chai.expect(await productsModel.addProductOnList(0)).to.deep.equal({});
    });
  });
});
