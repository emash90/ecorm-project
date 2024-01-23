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
        product_images: data.product_images,
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
    const { _id, product_name, product_description, product_price, product_category, product_subcategory, product_images, product_quantity } = req.body;
    try {
        const product_to_edit = await Product.findById(_id);
        product_to_edit.product_name = product_name;
        product_to_edit.product_description = product_description;
        product_to_edit.product_price = product_price;
        product_to_edit.product_category = product_category;
        product_to_edit.product_subcategory = product_subcategory;
        product_to_edit.product_images = product_images;
        product_to_edit.product_quantity = product_quantity;
        await product_to_edit.save();
        res.status(200).json({ product: product_to_edit, message: "Product edited successfully" });
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

const get_similar_products = async (req, res) => {
    const { category } = req.body;
    try {
        const resp = await Product.find({ product_category: category });
        console.log("resp", resp);
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
                    image: product.product_images,
                    quantity: product.product_quantity
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}

const delete_product = async (req, res) => {
    console.log(req.body);
    const { id } = req.body
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    add_product,
    get_all_products,
    edit_product,
    get_product,
    delete_product,
    get_similar_products
}