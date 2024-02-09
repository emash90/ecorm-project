const makeOrderController = ({ addOrderUseCase, updateOrderUseCase, deleteOrderUseCase, getAllOrdersUseCase, getOrderByIdUseCase, orderPresenter }) => {
        return {
            createOrder: async (req, res) => {
                try {
                    const { body } = req;
                    const order = await addOrderUseCase(body);
                    console.log('ordercreated ===>', order);
                    return orderPresenter.created(res, order);
                } catch (error) {
                    return orderPresenter.fail(res, error);
                }
            },
            updateOrder: async (req, res) => {
                try {
                    const { orderId } = req.params;
                    const { body } = req;
                    const order = await updateOrderUseCase(orderId, body);
                    return orderPresenter.success(res, order);
                } catch (error) {
                    return orderPresenter.fail(res, error);
                }
            },
            deleteOrder: async (req, res) => {
                try {
                    const { orderId } = req.params;
                    const order = await deleteOrderUseCase(orderId);
                    return orderPresenter.success(res, order);
                } catch (error) {
                    return orderPresenter.fail(res, error);
                }
            },
            getAllOrders: async (req, res) => {
                try {
                    const orders = await getAllOrdersUseCase();
                    return orderPresenter.success(res, orders);
                } catch (error) {
                    return orderPresenter.fail(res, error);
                }
            },
            getOrderById: async (req, res) => {
                try {
                    const { orderId } = req.params;
                    const order = await getOrderByIdUseCase(orderId);
                    return orderPresenter.success(res, order);
                } catch (error) {
                    return orderPresenter.fail(res, error);
                }
            }

        }
    }


module.exports = makeOrderController;
