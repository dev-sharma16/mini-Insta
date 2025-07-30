const uploadFile = require('../service/storage.service')
const Post = require('../models/post.model')
const generateCaption = require('../service/aiCaption.service')

async function uploadPost(req,res){
    const user = req.user
    const file = req.file;

    const fileData = await uploadFile(file)

    const post = await Post.create({
        userId: user._id,
        imageUrl: fileData.url,
        imageId: fileData.fileId,
        caption: req.body.caption
    })
    
    res
    .status(201)
    .json({
        success: true,
        message: 'Post created successfully',
        post
    })
}

async function userPosts(req,res){
    const user = req.user
    
    const posts = await Post.find({userId: user._id})
    res.status(200).json({
        success: true,
        message: "User posts fetched successfully",
        data: posts
    });
}

async function allPosts(req,res){
    const posts = await Post.find()
    res.status(200).json({
        success: true,
        message: "User posts fetched successfully",
        data: posts
    });
}

async function createCaption(req,res){
    const file = req.file;

    const caption = await generateCaption(file.buffer, file.mimetype)
    if(!caption || caption === "Failed to generate caption.") {
        return res.status(400).json({message: "Caption could not be generated"})
    }

    res.status(200)
    .json({
        message:"Generated Caption:",
        ...caption
    })
}

module.exports = {
    uploadPost,
    userPosts,
    allPosts,
    createCaption
}

