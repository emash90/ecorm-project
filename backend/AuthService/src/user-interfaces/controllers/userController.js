const makeUserController = ({ loginUserUseCase, registerUserUseCase, userPresenter }) => {
    return {
        loginUser: async (req, res) => {
            try {
                const { password, email } = req.body;
                const user = await loginUserUseCase({password, email });
                userPresenter.success(res, user);
            } catch (error) {
                userPresenter.error(res, error);
            }
        },
        registerUser: async (req, res) => {
            try {
                const { last_name, first_name, email, user_type, password } = req.body;
                const user = await registerUserUseCase({ last_name, first_name, user_type, password, email });
                userPresenter.created(res, user);
            } catch (error) {
                userPresenter.error(res, error);
            }
        }
    }
}

module.exports = makeUserController;