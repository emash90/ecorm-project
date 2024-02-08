const makeProductPresenter = () => {
    return {
        success: (response, data) => {
            return response.status(200).json(data);
        },
        created: (response, data) => {
            return response.status(201).json({ message: 'Product created successfully', data: data });
        },
        fail: (response, error) => {
            return response.status(400).json({ message: error.message });
        }
    }
}

module.exports = makeProductPresenter