const buildMakeOrderEntity = () => {
    return function makeOrderEntity ({
        products,
        customerId,
        orderDate = Date.now(),
        status = 'pending',
        totalAmount
    } = {}) {
        if (!products || products.length === 0) {
            throw new Error('Order must have at least one product.');
        }
        if (!customerId) {
            throw new Error('Order must have a customerId.');
        }

        if (!totalAmount) {
            throw new Error('Order must have a total amount.');
        }
        return Object.freeze({
            getProducts: () => products,
            getCustomerId: () => customerId,
            getOrderDate: () => orderDate,
            getStatus: () => status,
            getTotalAmount: () => totalAmount
        });
    }
}

module.exports = buildMakeOrderEntity;
