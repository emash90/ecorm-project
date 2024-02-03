const makeGetProductByIdUseCase = ({ productRepository }) => {
    return async function getProductByIdUseCase(productId) {
        return await productRepository.findProductById(productId);
    }
}

module.exports = makeGetProductByIdUseCase;