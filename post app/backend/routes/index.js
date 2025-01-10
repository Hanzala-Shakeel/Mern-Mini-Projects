// routes/index.js
const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes"); // Separate upload routes
const postRoutes = require("./postRoutes");
const verifyToken = require("../middlewares/authMiddleware");

router.use("/user", userRoutes);
router.use("/upload", uploadRoutes); // Add a new route for upload logic
router.use("/post", postRoutes);

// Authenticated route for the home page
router.get("/home", verifyToken, (req, res) => {
    if (!req.user) {
        return res.status(401).send("Unauthorized");
    }
    // If user is authenticated, send home page data
    res.status(200).send({ message: "Welcome to the home page", user: req.user });
});


module.exports = router;
