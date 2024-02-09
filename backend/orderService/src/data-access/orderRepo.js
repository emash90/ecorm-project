const makeOrderRepo = ({ database }) => {
    return Object.freeze({
        create: async (orderEntity) => {
            console.log('orderEntity1 ===>', orderEntity);
            const order = await database.insert(orderEntity);
            return order;
        },
        findOrderById: async (id) => {
            const order = await database.getOrderById(id);
            return order;
        },
        findOrderByUserId: async (userId) => {
            const orders = await database.getOrderByUserId(userId);
            return orders;
        },
        findAllOrders: async () => {
            const orders = await database.getAllOrders();
            return orders;
        },
        updateOrder: async (id, orderEntity) => {
            const order = await database.updateOrder(id, orderEntity);
            return order;
        },
        deleteOrder: async (id) => {
            const order = await database.deleteOrder(id);
            return order;
        }
    });
}

module.exports = makeOrderRepo;