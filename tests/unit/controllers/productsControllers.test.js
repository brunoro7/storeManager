const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);

  describe('getProducts', () => {
    it('1- Deve disparar um erro, caso seja disparado um erro;', () => {
      sinon.stub(productsService, 'getProducts').rejects();
      chai.expect(productsService.getProducts({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro, caso o service não retorne um lista;', () => {
      sinon.stub(productsService, 'getProducts').resolves([]);
      chai.expect(productsService.getProducts()).to.eventually.be.undefined;
    });

    it('3- Deve retornar uma lista com itens que tenham "id" e "name";', async () => {
      const productsList = [{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }];

      sinon.stub(productsService, 'getProducts').resolves(productsList);

      const result = await productsService.getProducts();

      chai.expect(result).to.deep.equal([{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }]);

      // sinon.stub(productsService, 'getProducts').resolves();
      // chai.expect().to.deep.equal();
    });
  });

  // describe('getProduct', () => {
  //   it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
  //     sinon.stub(productsService, 'getProductById').rejects;

  //     chai.expect().to.eventually.be.rejected;
  //   });

  //   it('2- Deve disparar um erro caso não retorne um objeto;', () => {
  //     sinon.stub(productsService, 'getProductById').resolves([]);

  //     chai.expect().to.eventually.be.undefined;
  //   });

  //   it('3- Deve retornar um objeto;', async () => {
  //     sinon.stub(productsService, 'getProductById').resolves([{}]);

  //     chai.expect(await productsService.getById(0)).to.be.deep.equal({});
  //   });
  // });
});