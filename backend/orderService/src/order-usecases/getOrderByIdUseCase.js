const makeGetOrderByIdUseCase = ({ orderRepository }) => {
    return async function getOrderById (orderId) {
        return await orderRepository.getById(orderId);
    }
}

module.exports = makeGetOrderByIdUseCase;