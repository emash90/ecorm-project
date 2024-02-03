const makeCreateProductUseCase = ({ productRepository, productEntity }) => {
  return async function createProduct (productData) {
    return await productRepository.create(productData);
  }
}

module.exports = makeCreateProductUseCase;