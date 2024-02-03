const makeGetAllProductsUseCase = ({ productRepository }) => {
    return async function getAllProductsUseCase() {
        return await productRepository.findAllProducts();
    }
}

module.exports = makeGetAllProductsUseCase;