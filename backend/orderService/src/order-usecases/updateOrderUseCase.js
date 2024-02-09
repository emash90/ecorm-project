const makeUpdateOrderUseCase = ({ orderRepository }) => {
    return async function updateOrder (orderId, orderData) {
        return await orderRepository.update(orderId, orderData);
    }
}

module.exports = makeUpdateOrderUseCase;