const express = require('express');
const router = express.Router();

// Importing the Product Controller and presenter

const makeProductControllers = require('../../../product-interfaces/controllers/productControllers');
const makeProductPresenter = require('../../../product-interfaces/presenters/productPresenters');
// Importing the Product Use Cases

const makeCreateProductUseCase = require('../../../product-usecases/createProductUseCase');
const makeGetAllProductsUseCase = require('../../../product-usecases/getAllProductsUseCase');
const makeGetProductByIdUseCase = require('../../../product-usecases/getProductByIdUseCase');
const makeUpdateProductUseCase = require('../../../product-usecases/updateProductUseCase');
const makeDeleteProductUseCase = require('../../../product-usecases/deleteProductUseCase');
const makeGetProductsByMerchantIdUseCase = require('../../../product-usecases/getProductsByMerchantIdUseCase');

// Importing the Product Repository

const makeProductRepo = require('../../../data-access/productRepo');

// Importing the Product Entity

const buildProductEntity = require('../../../product-entity/productEntity');

// Importing the Database

const makeProductDb = require('../../../data-access/database');

// Building the Product Entity

const makeProductEntity = buildProductEntity();
const productEntity = makeProductEntity;
const productDb = makeProductDb();
const productRepository = makeProductRepo({ database: productDb });

// Building the Product Use Cases

const addProductUseCase = makeCreateProductUseCase({ productRepository, productEntity });
const getAllProductsUseCase = makeGetAllProductsUseCase({ productRepository });
const updateProductUseCase = makeUpdateProductUseCase({ productRepository });
const deleteProductUseCase = makeDeleteProductUseCase({ productRepository });
const getProductByIdUseCase = makeGetProductByIdUseCase({ productRepository });
const getProductsByMerchantIdUseCase = makeGetProductsByMerchantIdUseCase({ productRepository });
const productPresenter = makeProductPresenter();

// Building the Product Controller

const productController = makeProductControllers({ getProductsByMerchantIdUseCase, addProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase, deleteProductUseCase, productPresenter });

// Defining the Product Routes

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/merchant/:merchantId', productController.getProductByMerchantId);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
