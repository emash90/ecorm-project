const Product = require('../models/productModel');



const add_product = async (req, res) => {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    try {
        await product.save();
        res.status(201).send(product);
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
                    name: product.name,
                    price: product.price,
                    description: product.description
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