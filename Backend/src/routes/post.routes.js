const express = require("express") 
const multer = require('multer')
const {uploadPost,allPost,createCaption} = require('../controllers/post.controller.js')

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/upload', upload.single("image"), uploadPost);

router.get("/allposts", allPost)

router.post('/generate-captions', upload.single("image"), createCaption)

module.exports = router