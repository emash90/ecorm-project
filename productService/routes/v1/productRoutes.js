const router = require('express').Router();

const { add_product, get_all_products, edit_product, get_product } = require('../../controllers/productControllers');
const { get_session } = require('../../middleware/authMiddleware');


router.post('/add', get_session, add_product);
router.get('/all', get_all_products);
router.put('/edit/:id',get_session, edit_product);
router.get('/:id', get_product);


module.exports = router;