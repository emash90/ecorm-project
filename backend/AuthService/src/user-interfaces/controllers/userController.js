const makeUserController = ({ loginUserUseCase, registerUserUseCase, userPresenter }) => {
    return {
        loginUser: async (req, res) => {
            try {
                const { password, email } = req.body;
                const user = await loginUserUseCase({password, email });
                userPresenter.success(res, user);
            } catch (error) {
                userPresenter.error(error);
            }
        },
        registerUser: async (req, res) => {
            try {
                const { name, email, password } = req.body;
                const user = await registerUserUseCase({ name, password, email });
                userPresenter.created(res, user);
            } catch (error) {
                userPresenter.error(res, error);
            }
        }
    }
}

module.exports = makeUserController;