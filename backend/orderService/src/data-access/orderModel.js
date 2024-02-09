const mongoose = require('mongoose');

// define the order model

const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true,
    },

    orderDate: {
        type: Date,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    }, {
        timestamps: true,
    });

    const Order = mongoose.model('Order', orderSchema);

    module.exports = Order;