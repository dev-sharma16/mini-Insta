const express = require("express") 
const jwt = require('jsonwebtoken');
const multer = require('multer')
const uploadFile = require('../service/storage.service')
const Post = require('../models/post.model')

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/upload',upload.single("image"),async(req,res)=>{
    const token = req.cookies.user

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(400).json({message: "Unauthorized token, login first.!"})
    
    const file = req.file;

    const fileData = await uploadFile(file)

    const post = await Post.create({
        userId: decodedToken.id,
        imageUrl: fileData.url,
        imageId: fileData.fileId
    })
    
    res
    .status(201)
    .json({
        message: 'Post created successfully',
        post
    })
});

router.get("/allposts",async(req,res)=>{
    const token = req.cookies.user

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(400).json({message: "Unauthorized token, login first.!"})
    
    const posts = await Post.find({userId: decodedToken.id})
    res.status(200).json({
        message: "User posts fetched successfully",
        data: posts
    });
})

module.exports = router