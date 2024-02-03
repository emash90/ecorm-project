const makeUpdateProductUseCase = ({ productRepository }) => {
    return async function updateProduct (productId, productData) {
        return await productRepository.updateProduct(productId, productData);
    }
}

module.exports = makeUpdateProductUseCase;