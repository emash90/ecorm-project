const makeCreateOrderUseCase = ({ orderRepository, orderEntity }) => {
    return async function createOrder (orderDetails) {
        console.log('orderDetails2 ===>', orderDetails);
        const { customerId, products, totalAmount } = orderDetails;
        const order = orderEntity({ customerId, products, totalAmount });
        console.log('order1 ===>', order);
        const orderData = {
            customerId: order.getCustomerId(),
            products: order.getProducts(),
            totalAmount: order.getTotalAmount(),
            status: order.getStatus(),
            orderDate: order.getOrderDate()
        }
        return await orderRepository.create(orderData);
    }
}

module.exports = makeCreateOrderUseCase;