// controllers/userController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require('dotenv').config()


const signupUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) return res.status(400).send("this email is already in use");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = await userModel.create({ ...req.body, password: hash });
        const token = jwt.sign({ _id: newUser._id, email: newUser.email, name: newUser.name, username: newUser.username }, process.env.JWT_SECRET);  // Generate the token
        res.cookie("token", token, { httpOnly: true });
        res.status(201).send({ message: "User created successfully", newUser });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("User not found");
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) return res.status(400).send("Invalid password");
        const token = jwt.sign({ _id: user._id, email: user.email, name: user.name, username: user.username }, process.env.JWT_SECRET);  // Generate the token
        res.cookie("token", token, { httpOnly: true });
        res.status(200).send("Successfully logged in");
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logged out successfully");
};

module.exports = {
    signupUser,
    loginUser,
    logoutUser
}