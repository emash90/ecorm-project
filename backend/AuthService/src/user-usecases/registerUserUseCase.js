const makeRegisterUserUseCase = ({ userRepository, passwordManager, userEntity }) => {
    const registerUserUseCase = async ({ last_name, first_name, user_type, password, email }) => {
        const hashedPassword = await passwordManager.encrypt(password);
        const user = userEntity({ last_name, first_name, user_type, password: hashedPassword, email });
        const createdUser = await userRepository.insertUser(user);
        ////if user already exists
        if (!createdUser) {
            throw new Error('User already exists');
        } else {
            return createdUser;
        }
    }
    return registerUserUseCase;
}

module.exports = makeRegisterUserUseCase;