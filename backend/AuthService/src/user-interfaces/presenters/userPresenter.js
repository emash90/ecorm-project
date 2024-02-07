const makeUserPresenter = () => {
    return {
        success: (response, data) => {
            response.status(200).json({ message: 'success', data})
        },
        created: (response, data) => {
            response.status(201).json({ message: 'success', data})
        },
        error: (response, error) => {
            response.status(400).json({ message: 'error', error})
        }
    }
}

module.exports = makeUserPresenter