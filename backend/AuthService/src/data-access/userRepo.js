const makeUserRepo = ({ userDb }) => {
    return Object.freeze({
        insertUser: async (userEntity) => {
            const user = await userDb.insert(userEntity);
            return user;
        },
        findUserByEmail: async (email) => {
            const user = await userDb.getUserByEmail(email);
            return user;
        },
        getUserById: async (id) => {
            const user = await userDb.getUserById(id);
            return user;
        },
    });

}

module.exports = makeUserRepo;