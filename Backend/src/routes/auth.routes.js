const express = require("express")
const {registerUser,loginUser,currentUser,logoutUser} = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/user', authMiddleware, currentUser)

router.get('/logout', logoutUser)

module.exports = router