const User = require('../data-access/userModel');
const connectDB = require('../data-access/db');

connectDB();

const makeUserDb = () => {
    const insert = async (userDetails) => {
        const userExists = await User.findOne({ email: userDetails.email });
        if (userExists) {
            throw new Error('User already exists');
        }
        const user = new User(userDetails);
        await user.save();
        return user;
    }
    const getUserByEmail = async (email) => {
        return User.findOne({ email });
    }

    return {
        insert,
        getUserByEmail
    }

}

module.exports = makeUserDb;