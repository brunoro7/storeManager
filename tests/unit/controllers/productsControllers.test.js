const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsControllers = require('../../../controllers/productsControllers');

chai.use(chaiAsPromised);

describe('controllers/productsControllers', () => {
  beforeEach(sinon.restore);

  const productsList = [{ id: 1, name: 'teste01' }, { id: 2, name: 'teste02' }];

  describe('getProducts', () => {
    it('1- Deve disparar um erro, caso productsService.getProducts dispare um erro;', () => {
      sinon.stub(productsService, 'getProducts').rejects();
      return chai.expect(productsControllers.getProducts({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve retornar um res.status como 200 e um res.json;', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'getProducts').resolves(productsList);
      await productsControllers.getProducts({}, res);
      
      return chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
    });
  });

  describe('getProduct', () => {
    it('1- Deve disparar um erro caso o productsService.getById dispare um erro;', () => {
      sinon.stub(productsService, 'getById').rejects();
      return chai.expect(productsControllers.getProduct({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve retornar um res.status como 200 e um res.json;', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'getById').resolves(req.params.id);
      
      await productsControllers.getProduct(req, res);
      return chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
    });
  });

  describe('addNewProduct', () => {
    it('1- Deve disparar um erro caso o productsService.validateBodyAdd dispare um erro;', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      return chai.expect(productsControllers.addNewProduct({}, {})).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o productsService.addProduct dispare um erro;', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'addProduct').rejects();

      return chai.expect(productsControllers.addNewProduct({}, {})).to.eventually.be.rejected;
    });

    it('3- Deve disparar um erro caso o productsService.getById dispare um erro;', async () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'addProduct').resolves();
      sinon.stub(productsService, 'getById').rejects();

      return chai.expect(productsControllers.addNewProduct({}, {})).to.eventually.be.rejected
    });

    it('4- Deve retornar o res.status com 201 e o res.json;', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'addProduct').resolves();
      sinon.stub(productsService, 'getById').resolves();

    await productsControllers.addNewProduct({}, res);
    return chai.expect(res.status.getCall(0).args[0]).to.equal(201);
    });
  });

  describe('deleteProduct', () => {
    it('1- Deve disparar um erro caso o productsService.getById dispare um erro;', () => {
      sinon.stub(productsService, 'getById').rejects();
      return chai.expect(productsControllers.deleteProduct()).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o productsService.deleteProduct dispare um erro;', () => {
      sinon.stub(productsService, 'getById').resolves();
      sinon.stub(productsService, 'deleteProduct').rejects();
      return chai.expect(productsControllers.deleteProduct()).to.eventually.be.rejected;
    });

    it('3- Deve retornar um res.status com 204 caso productsControllers.deleteProduct n??o dispare nenhum erro', async () => {
      const req = {
        params: { id: 1 },
      };
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };

      sinon.stub(productsService, 'getById').resolves();
      sinon.stub(productsService, 'deleteProduct').resolves();

      await productsControllers.deleteProduct(req, res);
      return chai.expect(res.status.getCall(0).args[0]).to.be.equal(204);
    });
  });

  describe('updateProduct', () => {
    it('1- Deve disparar um erro caso o productsService.validateBodyAdd dispare um erro;', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      return chai.expect(productsControllers.updateProduct()).to.eventually.be.rejected;
    });

    it('2- Deve disparar um erro caso o productsService.updateProduct dispare um erro;', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'updateProduct').rejects();
            
      return chai.expect(productsControllers.updateProduct({}, {})).to.eventually.be.rejected;
    });

    it('3- Deve disparar um erro caso o productsService.getById dispare um erro;', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'updateProduct').resolves();
      sinon.stub(productsService, 'getById').rejects();

      return chai.expect(productsControllers.updateProduct()).to.eventually.be.rejected;
    });

    // it.only('4- Deve retornar um res.status com 200 e um res.json n??o dispare um erro;', async () => {
    //   const res = {
    //     status: sinon.stub().callsFake(() => res),
    //     json: sinon.stub().returns(),
    //   };
    //   const req = {
    //     params: { id: 1 },
    //   };

    //   sinon.stub(productsService, 'validateBodyAdd').resolves();
    //   sinon.stub(productsService, 'updateProduct').resolves();
    //   sinon.stub(productsService, 'getById').resolves({ id: 1 });

    //   await productsControllers.updateProduct(req, res);

    //   chai.expect(res.status.getCall(0).args[0]).to.be.equal(200);
    //   return chai.expect(res.json.getCall(0).args[0]).to.be.equal({ id: 1 });
    // });
  });
});
