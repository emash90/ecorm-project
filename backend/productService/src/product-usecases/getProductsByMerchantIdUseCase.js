const makeGetProductsByMerchantIdUseCase = ({ productRepository }) => {
    return async function getProductsByMerchantIdUseCase(merchantId) {
        return await productRepository.findProductsByMerchantId(merchantId);
    }
}

module.exports = makeGetProductsByMerchantIdUseCase;