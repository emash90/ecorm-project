const buildUserEntity = () => {
    return function makeUserEntity({
        first_name,
        last_name,
        email,
        user_type,
        password
    } = {}) {
        if (!first_name) {
            throw new Error('User must have a first name.');
        }
        if (!last_name) {
            throw new Error('User must have a last name.');
        }
        if (!email) {
            throw new Error('User must have an email.');
        }
        if (!user_type) {
            throw new Error('User must have a user type.');
        }
        if (!password) {
            throw new Error('User must have a password.');
        }
        return Object.freeze({
            first_name,
            last_name,
            email,
            user_type,
            password
        });
    }
}

module.exports = buildUserEntity;
