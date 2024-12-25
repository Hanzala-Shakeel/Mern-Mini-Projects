const express = require("express");

const app = express();

const cors = require("cors");

const userModel = require("./models/user");

app.use(express.json());

app.use(cors());

app.get("/allusers", async (req, res) => {
    try {
        let allUsers = await userModel.find();
        res.status(200).send(allUsers);
    }
    catch (err) {
        res.status(404).send({ message: err.message });
    }
})

app.post("/post", async (req, res) => {
    try {
        const newUser = req.body;
        let createdUser = await userModel.create({ ...newUser });
        res.status(201).send({ message: "User created successfully", createdUser });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
})

app.delete("/delete/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        let deletedUser = await userModel.findOneAndDelete({ _id: userid });
        res.status(200).send({ message: "user successfully deleted", deletedUser })
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
})

app.post("/edit/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        let editUser = await userModel.findOneAndUpdate({ _id: userid }, { ...req.body }, { new: true });
        res.status(201).send({ message: "User edit successfully", editUser });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
})

app.get("/getuser/:userid", async (req, res) => {
    try {
        const { userid } = req.params;
        let user = await userModel.findOne({ _id: userid })
        res.status(201).send({ message: "User get successfully", user });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
})

app.listen(3000);