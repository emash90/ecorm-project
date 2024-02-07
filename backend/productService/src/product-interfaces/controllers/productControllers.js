const makeProductControllers = ({ addProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase, deleteProductUseCase, productPresenter }) => {
    return Object.freeze({
        createProduct: async (req, res) => {
            try {
                const { body } = req;
                const product = await addProductUseCase(body);
                return productPresenter.created(res, product);
            } catch (error) {
                return productPresenter.fail(res, error);
            }
        },

        getAllProducts: async (req, res) => {
            try {
                const products = await getAllProductsUseCase();
                return productPresenter.success(res, products);
            } catch (error) {
                return productPresenter.fail(error);
            }
        },

        getProductById: async (req, res) => {
            try {
                const { productId } = req.params;
                const product = await getProductByIdUseCase(productId);
                return productPresenter.success(res, product);
            } catch (error) {
                return productPresenter.fail(res, error);
            }
        },
        updateProduct: async (req, res) => {
            try {
                const { productId } = req.params;
                const { body } = req;
                const product = await updateProductUseCase(productId, body);
                return productPresenter.success(res, product);
            } catch (error) {
                return productPresenter.fail(res, error);
            }
        },
        deleteProduct: async (req, res) => {
            try {
                const { productId } = req.params;
                const product = await deleteProductUseCase(productId);
                return productPresenter.success(res, product);
            } catch (error) {
                return productPresenter.fail(res, error);
            }
        }
    });
}


module.exports = makeProductControllers;