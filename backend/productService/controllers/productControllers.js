const Product = require('../models/productModel');



const add_product = async (req, res) => {
    const data = req.body;
    const user_id = req.session.user._id;
    console.log("user_id", user_id);
    const product = new Product({ 
        user_id: user_id,
        product_name: data.product_name,
        product_description: data.product_description,
        product_price: data.product_price,
        product_category: data.product_category,
        product_subcategory: data.product_subcategory,
        product_image: data.product_image,
        product_quantity: data.product_quantity
    });
    try {
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
    }
}

const edit_product = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const product = await Product.findById(id);
        product.name = name;
        product.price = price;
        product.description = description;
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
    }
}


const get_product = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).send(product);
    } catch (error) {
        console.log(error);
    }
}

const get_all_products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(
            products.map(product => {
                return {
                    id: product._id,
                    name: product.product_name,
                    price: product.product_price,
                    description: product.product_description,
                    category: product.product_category,
                    subcategory: product.product_subcategory,
                    image: product.product_image,
                    quantity: product.product_quantity
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    add_product,
    get_all_products,
    edit_product,
    get_product
}