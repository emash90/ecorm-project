const makeOrderPresenter = () => {
    return {
        created: async (response, data) => {
            console.log('data ===>', data);
            return response.status(201).json({ message: 'Order created successfully', data: data })
        },
        success: async (response, data) => {
            return response.status(200).json(data);
        },
        fail: async (response, error) => {
            return response.status(400).json({ message: error.message });
        }
    }
}

module.exports = makeOrderPresenter;