const Product = require('./productModel');
const connectDB = require('./db');

connectDB();

const makeProductDb = () => {
    const insert = async (productDetails) => {
        console.log('productDetails ===>', productDetails);
        const productExists = await Product.findOne({ name: productDetails.name });
        if (productExists) {
            throw new Error('Product already exists');
        }
        const product = new Product(productDetails);
        await product.save();
        return product;
    }
    const getProductByName = async (name) => {
        return Product.findOne({ name });
    }
    const getProductById = async (id) => {
        //check if product exists
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    const getAllProducts = async () => {
        console.log('getAllProducts ===>');
        return Product.find({}).lean();
    }
    const updateProduct = async (id, productDetails) => {
        const product = await Product.findByIdAndUpdate(id, productDetails, { new: true });
        return product;
    }
    const deleteProduct = async (id) => {
        const product = await Product.findByIdAndDelete(id);
        return product;
    }
    return {
        insert,
        getProductByName,
        getProductById,
        getAllProducts,
        updateProduct,
        deleteProduct
    }
}

module.exports = makeProductDb;