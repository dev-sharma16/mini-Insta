const express = require("express") 
const multer = require('multer')
const generateCaption = require('../service/aiCaption.service')
const {uploadPost,allPost,generateCaption} = '../controllers/post.controller.js'

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/upload', upload.single("image"), uploadPost);

router.get("/allposts", allPost)

router.post('/generate-captions', upload.single("image"), generateCaption)

module.exports = router