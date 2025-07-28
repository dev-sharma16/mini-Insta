const express = require("express")
const {registerUser,loginUser,currentUser,logoutUser} = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/user', currentUser)

router.get('/logout', logoutUser)

module.exports = router