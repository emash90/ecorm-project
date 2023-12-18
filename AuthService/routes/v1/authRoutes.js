const router = require('express').Router();


const { registerUser, loginUser, getAllUsers } = require('../../controllers/authControllers');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/users').get(getAllUsers);


module.exports = router;