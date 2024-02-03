const buildUserEntity = () => {
    return function makeUserEntity({
        name,
        email,
        password
    } = {}) {
        if (!name) {
            throw new Error('User must have a name.');
        }
        if (!email) {
            throw new Error('User must have an email.');
        }
        if (!password) {
            throw new Error('User must have a password.');
        }
        return Object.freeze({
            name,
            email,
            password
        });
    }
}

module.exports = buildUserEntity;
