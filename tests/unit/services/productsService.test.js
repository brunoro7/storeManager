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
      chai.expect(productsService.getProducts())
        .to.eventually.be.rejected;
    });
    
    it('2- Deve disparar um erro, caso o model não retorne uma lista;', () => {
      sinon.stub(productsModel, 'getProductsList').resolves({});
      chai.expect(productsService.getProducts())
        .to.eventually.be.rejected;
    });

    it('3- Deve retornar uma lista com itens que tenham "id" e "name";', async () => {
      const productsListTest = [{ id: 1, name: 'Traje de encolhimento' }];

      sinon.stub(productsModel, 'getProductsList').resolves(productsListTest);

      const result = await productsService.getProducts();

      // se tornam 'dispensáveis', pois, só irá testar o index[0], se existir a lista com o objeto;
      // chai.expect(result).to.be.instanceOf(Array);
      // chai.expect(result[0]).to.be.instanceOf(Object);
      // chai.expect(result[0].id).to.equal(1);
      // chai.expect(result[0].name).to.equal('Traje de encolhimento');

      // Esta linha substiui a necessidade das anteriores, pois, eles testara o retorno que vem dentro do result;
      chai.expect(result).to.deep.equal([{ id: 1, name: 'Traje de encolhimento' }]);
    });
  });

  describe('getById', () => {
    it('1- Deve disparar um erro caso o db.query dispare um erro;', () => {
      sinon.stub(productsModel, 'getProductById').rejects;
      chai.expect(productsService.getById(0)).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso não retorne um objeto;', () => {
      sinon.stub(productsModel, 'getProductById').resolves([]);
      chai.expect(productsService.getById(0)).to.eventually.be.undefined;
    });

    it('3- Deve retornar um objeto;', async () => {
      sinon.stub(productsModel, 'getProductById').resolves([{}]);

      chai.expect(await productsService.getById(0)).to.be.deep.equal({});
    });
  });
});