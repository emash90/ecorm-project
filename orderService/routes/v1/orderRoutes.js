const router = require('express').Router();

// const { get_session } = require('../../middleware/authMiddleware');

const { get_all_orders, get_order_by_id, create_order, update_order, delete_order } = require('../../controllers/orderControllers');

router.get('/', get_all_orders);

router.get('/:id', get_order_by_id);

router.post('/', create_order);

router.put('/:id', update_order);

router.delete('/:id', delete_order);

module.exports = router;