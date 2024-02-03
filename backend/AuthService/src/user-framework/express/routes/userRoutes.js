const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const makeUserController = require('../../../user-interfaces/controllers/userController');
const makeLoginUserUseCase = require('../../../user-usecases/loginUserUseCase');
const makeRegisterUserUseCase = require('../../../user-usecases/registerUserUseCase');
const makeUserPresenter = require('../../../user-interfaces/presenters/userPresenter');
const passwordManager = require('../../../utils/passwordManager')({ bcrypt });
const makeUserRepo = require('../../../data-access/userRepo');
const makeUserDb = require('../../../data-access/database');
const buildUserEntity = require('../../../user-entity/userEntity');


const makeUserEntity = buildUserEntity();
const userEntity = makeUserEntity
const userDb = makeUserDb();
const userRepository = makeUserRepo({ userDb });



const loginUserUseCase = makeLoginUserUseCase({ userRepository, passwordManager });
const registerUserUseCase = makeRegisterUserUseCase({ userRepository, passwordManager, userEntity });
const userPresenter = makeUserPresenter();
const userController = makeUserController({ loginUserUseCase, registerUserUseCase, userPresenter });

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;


