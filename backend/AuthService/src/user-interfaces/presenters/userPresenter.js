const makeUserPresenter = () => {
    return {
        success: (response, data) => {
            response.status(200).json(data);
        },
        created: (response, data) => {
            response.status(201).json(data);
        },
        error: (response, error) => {
            response.status(400).json({ message: error.message });
        }
    }
}

module.exports = makeUserPresenter