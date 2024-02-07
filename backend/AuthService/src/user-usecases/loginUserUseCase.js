const makeLoginUserUseCase = ({ userRepository, passwordManager }) => {
    const loginUserUseCase = async ({ email, password }) => {
        const user = await userRepository.findUserByEmail(email)
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await passwordManager.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    }
    return loginUserUseCase;
}

module.exports = makeLoginUserUseCase;