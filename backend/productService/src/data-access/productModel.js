const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    images: { type: Array, required: false },
    quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;