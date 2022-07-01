const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsControllers = require('../../../controllers/productsControllers');

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);
  const res = {
    status: sinon.stub().callsFake(() => res),
    json: sinon.stub().returns(),
  };
  const productsList = [{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }];

  describe('getProducts', () => {
    it('1- Deve disparar um erro, caso seja disparado um erro;', () => {
      sinon.stub(productsService, 'getProducts').rejects();
      chai.expect(productsControllers.getProducts({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro, caso o service não retorne um lista;', () => {
      sinon.stub(productsService, 'getProducts').resolves([]);
      chai.expect(productsControllers.getProducts()).to.eventually.be.undefined;
    });

    it('3- Deve retornar um res.status como 200 e um res.json;', async () => {
      sinon.stub(productsService, 'getProducts').resolves(productsList);
      await productsControllers.getProducts({}, res);
      
      chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal([{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }]);
    });
  });

  describe('getProduct', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(productsService, 'getById').rejects();
      chai.expect(productsControllers.getProduct({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso não retorne um objeto;', () => {
      sinon.stub(productsService, 'getById').resolves([{}]);

      chai.expect(productsControllers.getProduct(0)).to.eventually.be.undefined;
    });

    // it('3- Deve retornar um res.status como 200 e um res.json;', async () => {
    //   sinon.stub(productsService, 'getById').resolves([{ id: 1 }]);
    //   await productsControllers.getProduct({}, res);

    //   chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
    //   // chai.expect(res.json.getCall(0).args[0]).to.be.deep.equal({});
    // });
  });
});