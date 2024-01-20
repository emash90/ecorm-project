const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product_name: { type: String, required: true },
    product_description: { type: String, required: false },
    product_price: { type: Number, required: true },
    product_category: { type: String, required: true },
    product_subcategory: { type: String, required: true },
    product_images: { type: Array, required: true },
    product_quantity: { type: Number, required: true }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;