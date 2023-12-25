const router = require('express').Router();

const { add_product, get_all_products } = require('../../controllers/productControllers');


router.post('/add', add_product);
router.get('/all', get_all_products);


module.exports = router;