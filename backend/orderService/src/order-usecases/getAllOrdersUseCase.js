const makeGetAllOrdersUseCase = ({ orderRepository }) => {
    return async function getAllOrders () {
        return await orderRepository.findAllOrders();
    }
}

module.exports = makeGetAllOrdersUseCase;