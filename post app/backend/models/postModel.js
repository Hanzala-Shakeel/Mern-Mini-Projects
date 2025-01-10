const mongoose = require("../config/databaseConfig");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    content: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    ],
    postImage: {
        type: String
    }
    ,
    postImageId:{
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("posts", postSchema);