// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, likePost, findPost, editPost, deletePost } = require("../controllers/postController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/create", verifyToken, createPost);
router.get("/posts", verifyToken, getAllPosts);
router.post("/like/:postid", verifyToken, likePost);
router.post("/edit/:postid", verifyToken, editPost);
router.get("/findpost/:postid", verifyToken, findPost);
router.delete("/delete/:postid", verifyToken, deletePost);


module.exports = router;