const express = require("express") 
const multer = require('multer')
const {uploadPost,allPosts,createCaption,userPosts} = require('../controllers/post.controller.js')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post(
    '/upload', 
    authMiddleware, 
    upload.single("image"), 
    uploadPost
);

router.get(
    "/user-posts", 
    authMiddleware, 
    userPosts
)

router.get(
    "/all-posts", 
    authMiddleware, 
    allPosts
)

router.post(
    '/generate-captions', 
    authMiddleware, 
    upload.single("image"), 
    createCaption
)

module.exports = router