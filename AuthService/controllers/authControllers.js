const User = require("../models/userModel");
const bcrypt = require('bcryptjs');


///////register new user

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    ///check if user already exists
    const userExists = await User.findOne({ username: username });
    if (userExists) {
        return res.status(400).send("User already exists");
    } else {
        ////hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        try {
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            console.log(error);
        }
    }
}

///////login user

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const loggedInUser = await User.findOne({ username: username });
        if (!loggedInUser) {
            return res.status(404).send("User not found");
        } else {
            const passwordCorrect = await bcrypt.compare(password, loggedInUser.password);
            if (passwordCorrect) {
                req.session.user = loggedInUser;
                return res.status(200).json({
                    id: loggedInUser._id,
                    username: loggedInUser.username,
                    email: loggedInUser.email,
                    role: loggedInUser.role,
                    session_id: req.sessionID
                })
            
            } else {
                return res.status(401).send("Password incorrect");
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

///////get all users

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(
            users.map(user => {
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            })
        )
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}

module.exports = { registerUser, loginUser, getAllUsers }


