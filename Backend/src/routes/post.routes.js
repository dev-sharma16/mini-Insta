const express = require("express") 
const multer = require('multer')
const {uploadPost,allPosts,createCaption,userPosts,deletePost,postById,updateCaption} = require('../controllers/post.controller.js')
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

router.get(
    "/:id",
    postById
)

router.post(
    '/generate-captions', 
    authMiddleware, 
    upload.single("image"), 
    createCaption
)

router.delete(
    '/delete-post/:id', 
    authMiddleware, 
    deletePost
)

router.patch(
    '/update-post/:id', 
    authMiddleware, 
    updateCaption
)

module.exports = router