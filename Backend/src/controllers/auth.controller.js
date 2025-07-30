const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const cookieOptions = {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: "Lax", // or "None" with secure: true if cross-site
    maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    path: "/",
};

async function registerUser(req,res){
    const {username, password} = req.body

    if(!username || !password) {
        return res
        .status(400)
        .json({success: false,message: "Username and Password are required"})
    }

    const isUserExists = await User.findOne({ username })
    if(isUserExists) return res.status(409).json({success: false,message: "Username already in use"})

    const user = await User.create({
        username, 
        password: await bcrypt.hash(password,10)
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.cookie("user",token, cookieOptions)

    const {password: _, ...userWithoutPassword} = user.toObject()

    res.status(201).json({
        success: true,
        message: "User is successfully registered",
        userWithoutPassword
    })
}

async function loginUser(req,res){
    const {username, password} = req.body

    const isUserExists = await User.findOne({username})
    if(!isUserExists) return res.status(400).json({ success:false,message:"User not found"})
    
    const isPasswordValid = await bcrypt.compare(password,isUserExists.password)
    if(!isPasswordValid) return res.status(400).json({success:false,message:"Password is invalid.!"})

    const token = jwt.sign({id:isUserExists._id},process.env.JWT_SECRET)

    res.cookie("user",token, cookieOptions)
    
    const {password: _, ...userWithoutPassword} = isUserExists.toObject()

    return res
    .status(200)
    .json({
        success: true,
        message: `${isUserExists.username} is successfully logined.!`,
        user: userWithoutPassword
    })
}

async function currentUser(req,res){
    const user = req.user

    return res
    .status(200)
    .json({
        success: true,
        message: "User details :-",
        user
    })
}

async function logoutUser(req,res){
    res.clearCookie("user")
    
    res
    .status(200)
    .json({
        success: true,
        message: "User logout successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    logoutUser
}