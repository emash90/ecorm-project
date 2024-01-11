const Order = require('../models/orderModels');

// const { get_session } = require('../../middleware/authMiddleware');

//////////////////////get all orders

const get_all_orders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'username email').populate('products.productId', 'name price');
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
    }
}

//////////////////////get order by id

const get_order_by_id = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('userId', 'username email').populate('products.productId', 'name price');
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
    }
}

//////////////////////create order

const create_order = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const order = await Order.create({ userId, products });
        res.status(201).send(order);
    } catch (error) {
        console.log(error);
    }
}

//////////////////////update order

const update_order = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
    }
}

//////////////////////delete order

const delete_order = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    get_all_orders,
    get_order_by_id,
    create_order,
    update_order,
    delete_order
}