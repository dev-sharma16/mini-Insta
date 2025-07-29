const jwt = require('jsonwebtoken');
const uploadFile = require('../service/storage.service')
const Post = require('../models/post.model')
const generateCaption = require('../service/aiCaption.service')

async function uploadPost(req,res){
    const token = req.cookies.user

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(400).json({message: "Unauthorized token, login first.!"})
    
    const file = req.file;

    const fileData = await uploadFile(file)

    const post = await Post.create({
        userId: decodedToken.id,
        imageUrl: fileData.url,
        imageId: fileData.fileId,
        caption: req.body.caption
    })
    
    res
    .status(201)
    .json({
        message: 'Post created successfully',
        post
    })
}

async function allPost(req,res){
    const token = req.cookies.user

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(400).json({message: "Unauthorized token, login first.!"})
    
    const posts = await Post.find({userId: decodedToken.id})
    res.status(200).json({
        message: "User posts fetched successfully",
        data: posts
    });
}

async function createCaption(req,res){
    const token = req.cookies.user

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(400).json({message: "Unauthorized token, login first.!"})
    
    const file = req.file;

    const caption = await generateCaption(file.buffer, file.mimetype)
    if(!caption || caption === "Failed to generate caption.") {
        return res.status(400).json({message: "Caption could not be generated"})
    }

    res.status(200)
    .json({
        message:"Generated Caption:",
        caption: caption
    })
}

module.exports = {
    uploadPost,
    allPost,
    createCaption
}

