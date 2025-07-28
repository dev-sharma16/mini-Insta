const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        userId: String,
        imageUrl: String,
        imageId: String
    },
    { 
        timestamps: true 
    }
)

const Post = mongoose.model("Post",postSchema)

module.exports = Post;