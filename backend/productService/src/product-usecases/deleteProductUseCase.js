const makeDeleteProductUseCase = ({ productRepository }) => {
    return async function deleteProduct (productId) {
        return await productRepository.deleteProduct(productId);
    }
}

module.exports = makeDeleteProductUseCase;