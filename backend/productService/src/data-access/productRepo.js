const makeProductRepo = ({ database }) => {
    return Object.freeze({
        create: async (productEntity) => {
            const product = await database.insert(productEntity);
            return product;
        },
        findProductById: async (id) => {
            const product = await database.getProductById(id);
            return product;
        },
        findProductByName: async (name) => {
            const product = await database.getProductByName(name);
            return product;
        },
        findAllProducts: async () => {
            const products = await database.getAllProducts();
            return products;
        },
        updateProduct: async (id, productEntity) => {
            const product = await database.updateProduct(id, productEntity);
            return product;
        },
        deleteProduct: async (id) => {
            const product = await database.deleteProduct(id);
            return product;
        }
    });
}

module.exports = makeProductRepo;