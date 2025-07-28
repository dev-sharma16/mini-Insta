const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerUser(req,res){
    const {username, password} = req.body

    if(!username || !password) {
        return res
        .status(400)
        .json({message: "Username and Password are required"})
    }

    const isUserExists = await User.findOne({ username })
    if(isUserExists) return res.status(409).json({message: "Username already in use"})

    const user = await User.create({
        username, 
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie("user",token)

    res.status(201).json({
        message: "User is successfully registered",
        user
    })
}

async function loginUser(req,res){
    const {username, password} = req.body

    const isUserExists = await User.findOne({username})
    if(!isUserExists) return res.status(400).json({message:"User not found"})
    
    const isPasswordValid = await bcrypt.compare(password,isUserExists.password)
    if(!isPasswordValid) return res.status(400).json({message:"Password is invalid.!"})

    const token = jwt.sign({id:isUserExists._id},process.env.JWT_SECRET)

    res.cookie("user",token)

    return res
    .status(200)
    .json({
        message: `${isUserExists.username} is successfully logined.!`,
    })
}

async function currentUser(req,res){
    const currentToken = req.cookies.user
    if(!currentToken) return res.status(400).json({message: "Unauthorized access"})

    try {
        const decodedToken = jwt.verify(currentToken,process.env.JWT_SECRET);

        const user = await User.findById({_id:decodedToken.id})
        if(!user) return res.status(400).json({message:"User not found"})

        return res
        .status(200)
        .json({
            message: "User details :-",
            user
        })
    } catch (error) {
        return res
        .status(400)
        .json({
            message: "Unauthorized token"
        })
    }
}

async function logoutUser(req,res){
    res.clearCookie("user")
    
    res
    .status(200)
    .json({
        message: "User logout successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser
}