const router = require('express').Router()

//import the order controller and presenter

const makeOrderControllers = require('../../../order-interfaces/controllers/orderController')
const makeOrderPresenter = require('../../../order-interfaces/presenters/orderPresenter')

//import the order use cases

const makeCreateOrderUseCase = require('../../../order-usecases/createOrderUseCase')
const makeGetAllOrdersUseCase = require('../../../order-usecases/getAllOrdersUseCase')
const makeGetOrderByIdUseCase = require('../../../order-usecases/getOrderByIdUseCase')
const makeUpdateOrderUseCase = require('../../../order-usecases/updateOrderUseCase')
const makeDeleteOrderUseCase = require('../../../order-usecases/deleteOrderUseCase')

//import the order repository

const makeOrderRepo = require('../../../data-access/orderRepo')
const makeOrderDb = require('../../../data-access/database')

//import the order entity

const buildMakeOrderEntity = require('../../../order-entity/orderEntity')

//instantiating the order entity

const makeOrderEntity = buildMakeOrderEntity()

//instantiating the order database

const orderDb = makeOrderDb()

//instantiating the order repository

const orderRepository = makeOrderRepo({ database: orderDb })

//instantiating the order use cases

const addOrderUseCase = makeCreateOrderUseCase({ orderRepository, orderEntity: makeOrderEntity })
const getAllOrdersUseCase = makeGetAllOrdersUseCase({ orderRepository })
const getOrderByIdUseCase = makeGetOrderByIdUseCase({ orderRepository })
const updateOrderUseCase = makeUpdateOrderUseCase({ orderRepository })
const deleteOrderUseCase = makeDeleteOrderUseCase({ orderRepository })
const orderPresenter = makeOrderPresenter()

//instantiating the order controller

const orderController = makeOrderControllers({ addOrderUseCase, getAllOrdersUseCase, getOrderByIdUseCase, updateOrderUseCase, deleteOrderUseCase, orderPresenter })

//defining the order routes

router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrders)
router.get('/:orderId', orderController.getOrderById)
router.put('/:orderId', orderController.updateOrder)
router.delete('/:orderId', orderController.deleteOrder)

module.exports = router