const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        imageUrl: String,
        imageId: String,
        caption: String,
        userId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    },
    { 
        timestamps: true 
    }
)

const Post = mongoose.model("Post",postSchema)

module.exports = Post;