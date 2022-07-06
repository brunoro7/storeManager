const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

chai.use(chaiAsPromised);

describe('services/productsService', () => {
  beforeEach(sinon.restore);
  
  describe('getProducts', () => {
    it('1- Deve disparar um erro, caso seja disparado um erro;', () => {
      sinon.stub(productsModel, 'getProductsList').rejects();
      return chai.expect(productsService.getProducts())
        .to.eventually.be.rejected;
    });

    it('2- Deve retornar uma lista de objetos, que tenham "id" e "name";', async () => {
      const productsListTest = [{ id: 1, name: 'Traje de encolhimento' }];

      sinon.stub(productsModel, 'getProductsList').resolves(productsListTest);

      const result = await productsService.getProducts();

      // se tornam 'dispensáveis', pois, só irá testar o index[0], se existir a lista com o objeto;
      // chai.expect(result).to.be.instanceOf(Array);
      // chai.expect(result[0]).to.be.instanceOf(Object);
      // chai.expect(result[0].id).to.equal(1);
      // chai.expect(result[0].name).to.equal('Traje de encolhimento');

      // Esta linha substiui a necessidade das anteriores, pois, eles testara o retorno que vem dentro do result;
      return chai.expect(result).to.deep.equal([{ id: 1, name: 'Traje de encolhimento' }]);
    });
  });

  describe('getById', () => {
    it('1- Deve disparar um erro caso o productsModel.getProductById dispare um erro;', () => {
      sinon.stub(productsModel, 'getProductById').rejects();
      return chai.expect(productsService.getById(0)).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o objeto não exista;', () => {
      sinon.stub(productsModel, 'getProductById').resolves(false);
      return chai.expect(productsService.getById(0)).to.eventually.throw;
    });

    it('3- Deve retornar um objeto;', async () => {
      sinon.stub(productsModel, 'getProductById').resolves([{}]);

      return chai.expect(await productsService.getById(0)).to.be.deep.equal({});
    });
  });

  describe('addProduct', () => {
    it('1- Deve disparar um erro caso o productsModel.addProductOnList dispare um erro;', () => {
      sinon.stub(productsModel, 'addProductOnList').rejects();
      return chai.expect(productsService.addProduct({})).to.eventually.be.rejected;
    });

    it('2- Deve retornar um "id";', () => {
      sinon.stub(productsModel, 'addProductOnList').resolves(1);
      return chai.expect(productsService.addProduct({})).to.eventually.equal(1);
    });
  });

  describe('validateBodyAdd', () => {
    const value = { name: 'teste' };
    const valueLength = { name: 'ops' };

    it('1- Deve disparar um erro caso o productsModel.getProductById dispare um erro;', () => {
      sinon.stub(productsModel, 'getProductById').rejects();
      return chai.expect(productsService.validateBodyAdd({})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o "name" seja undefined;', () => {
      sinon.stub(productsModel, 'getProductById').resolves(undefined);
      return chai.expect(productsService.validateBodyAdd(value)).to.eventually.throw;
    });

    it('3- Deve disparar um erro caso o "name" seja "";', () => {
      sinon.stub(productsModel, 'getProductById').resolves("");
      return chai.expect(productsService
        .validateBodyAdd(value)).to.eventually.throw;
    });

    it('4- Deve disparar um erro caso o "name" tenha menos que 5 caracteres;', () => {
      sinon.stub(productsModel, 'getProductById').resolves(valueLength);
      return chai.expect(productsService
        .validateBodyAdd(valueLength)).to.eventually.throw;
    });

    it('5- Deve retornar um objeto;', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(value);

      return chai.expect(await productsService.validateBodyAdd(value)).to.be.deep.equal({ name: 'teste' });
    });
  });

  describe('deleteProduct', () => {
    it('1- Deve disparar um erro caso o productsModel.deleteProduct dispare um erro;', () => {
      sinon.stub(productsModel, 'getProductById').rejects();
      return chai.expect(productsService.deleteProduct()).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o productsModel.deleteProduct dispare um erro;', () => {
      sinon.stub(productsModel, 'getProductById').resolves();
      sinon.stub(productsModel, 'deleteProduct').rejects();
      return chai.expect(productsService.deleteProduct()).to.eventually.be.rejected;
    });

    it('3- Deve retornar "true" caso productsModel.deleteProduct não dispare nenhum erro', () => {
      // const productTest = { id: 1, name: "teste" };
      sinon.stub(productsModel, 'getProductById').resolves();
      sinon.stub(productsModel, 'deleteProduct').resolves();

      return chai.expect(productsService.deleteProduct()).to.eventually.equal(true);
    });
  });

  describe('updateProduct', () => {
    it('1- Deve disparar um erro caso o productsModel.updateProduct dispare um erro;', () => {
      sinon.stub(productsModel, 'updateProduct').rejects();
      return chai.expect(productsService.updateProduct()).to.eventually.be.rejected;
    });

    it('2- Deve retornar "true" caso productsModel.updateProduct não dispare nenhum erro', () => {
      sinon.stub(productsModel, 'updateProduct').resolves();

      return chai.expect(productsService.updateProduct()).to.eventually.equal(true);
    });
  });
});
