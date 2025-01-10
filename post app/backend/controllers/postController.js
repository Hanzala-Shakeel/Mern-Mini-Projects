const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const cloudinary = require('cloudinary').v2;

const createPost = async (req, res) => {
    try {
        console.log("body===>", req.body);

        const user = await userModel.findOne({ _id: req.user._id });
        if (!user) return res.status(404).send("User not found");
        const post = await postModel.create({
            user: req.user._id,
            content: req.body.postContent,
            postImage: req.body.imageUrl,
            postImageId: req.body.image_public_id
        })
        user.posts.push(post._id);
        await user.save();
        res.status(201).send("post created successfully");
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate("user", "username");
        res.status(200).send({ message: "successfully get all posts", posts });
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const likePost = async (req, res) => {
    try {
        const post = await postModel.findOne({ _id: req.params.postid })
        if (!post) return res.status(404).send("Post not found");
        const alreadyLike = post.likes.indexOf(req.user._id);
        if (alreadyLike !== -1) {
            post.likes.splice(alreadyLike, 1)
            await post.save();
            res.status(201).send("post unlike successfully");
        }
        else {
            post.likes.push(req.user._id);
            await post.save();
            res.status(200).send("post like successfully");
        }
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const findPost = async (req, res) => {
    try {
        const post = await postModel.findOne({ _id: req.params.postid });
        if (!post) return res.status(404).send("Post not found");
        res.status(200).send({ message: "post fetch successfully", post });
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const editPost = async (req, res) => {
    try {
        // Find the post first before updating it
        const post = await postModel.findById(req.params.postid);
        if (!post) return res.status(404).send("Post not found");

        // Delete old post image if a new image is being uploaded (if req.file exists)
        if (post.postImageId && req.file) {
            const result = await cloudinary.uploader.destroy(post.postImageId);
            if (result.result !== "ok") {
                return res.status(500).send({ message: 'Failed to delete image', result });
            }
        }

        // Update the post after image deletion
        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.postid,
            {
                content: req.body.postContent,
                postImage: req.body.imageUrl || post.imageUrl,
                postImageId: req.body.image_public_id || post.image_public_id
            },
            { new: true }
        );

        res.status(200).send("Post edited successfully");
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await postModel.findOneAndDelete({ _id: req.params.postid })
        if (!post) return res.status(404).send("Post not found");
        // Agar post ke sath image attached hai to Cloudinary se delete karna
        if (post.postImageId) {
            const result = await cloudinary.uploader.destroy(post.postImageId);
            if (result.result !== "ok") {
                return res.status(500).send({ message: 'Failed to delete image', result });
            }
        }
        res.status(200).send("delete post successfully");
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
}

module.exports = { createPost, getAllPosts, likePost, editPost, findPost, deletePost }