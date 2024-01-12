const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, 
{ timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
