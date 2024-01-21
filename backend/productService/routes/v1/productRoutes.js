const router = require('express').Router();

const { add_product, get_all_products, get_similar_products, edit_product, get_product, delete_product } = require('../../controllers/productControllers');
const { get_session } = require('../../middleware/authMiddleware');


router.post('/add', get_session, add_product);
router.get('/all', get_all_products);
router.post('/similar', get_similar_products);
router.put('/edit/:id', edit_product);
router.get('/:id', get_product);
router.post('/delete', delete_product);


module.exports = router;