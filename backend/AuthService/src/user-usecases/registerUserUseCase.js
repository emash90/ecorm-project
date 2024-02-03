const makeRegisterUserUseCase = ({ userRepository, passwordManager, userEntity }) => {
    const registerUserUseCase = async ({ name, password, email }) => {
        const hashedPassword = await passwordManager.encrypt(password);
        const user = userEntity({ name, password: hashedPassword, email });
        const createdUser = await userRepository.insertUser(user);
        console.log('createdUser===>', createdUser);
        return createdUser;
    }
    return registerUserUseCase;
}

module.exports = makeRegisterUserUseCase;