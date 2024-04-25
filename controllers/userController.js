const userModel = require("../models/usermodel");
const bcrypt = require('bcrypt');

// Register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check for valid input
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all fields'
            });
        }

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();

        return res.send({
            success: true,
            message: "New user created",
            user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            error
        });
    }
};

// Get all users
exports.getAlluser = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            usercount: users.length,
            success: true,
            message: "All user data",
            users
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in getAlluser callback",
            error
        });
    }
};

// Login user
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                message: "Please provide valid email and password",
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email is not registered"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Login successful"
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error in login callback",
            error
        });
    }
};
