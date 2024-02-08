const Order = require('./orderModel');
const connectDB = require('./db');


connectDB();

const makeOrderDb = () => {
    const insert = async (orderDetails) => {
        console.log('orderDetails 3 ===>', orderDetails);
        const order = new Order(orderDetails);
        await order.save();
        return order;
    }
    const getOrderById = async (id) => {
        //check if order exists
        const order = await Order.findById(id);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
    const getAllOrders = async () => {
        console.log('getAllOrders ===>');
        return Order.find({}).lean();
    }
    const updateOrder = async (id, orderDetails) => {
        const order = await Order.findByIdAndUpdate(id, orderDetails, { new: true });
        return order;
    }
    const deleteOrder = async (id) => {
        const order = await Order.findByIdAndDelete(id);
        return order;
    }
    return {
        insert,
        getOrderById,
        getAllOrders,
        updateOrder,
        deleteOrder
    }
}

module.exports = makeOrderDb;