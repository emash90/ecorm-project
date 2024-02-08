const makeDeleteOrderUseCase = ({ orderRepository }) => {
    return async function deleteOrder (orderId) {
        return await orderRepository.delete(orderId);
    }
}

module.exports = makeDeleteOrderUseCase;