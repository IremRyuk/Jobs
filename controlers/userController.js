const UserSchema = require('../Schema/UsersSchema')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


// JsonWebToken
const createToken = (id) => {
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'2d'})
}


// Get ALL Users
const AllUsers = async (req,res) => {
    const allDataUsers = await UserSchema.find().sort({updatedAt:-1})
    res.status(200).json({allData:allDataUsers})
}


// Login Control
const logIn = async (req,res) => {
    const {gmail,password} = req.body
    try{
        const IsLoginOk = await UserSchema.login(gmail,password)
        // if IsLoginOk Valid
        const token  = createToken(IsLoginOk._id)
        res.status(200).json({gmail,token})
    }catch(err){
        res.status(400).json({LoginErrMsg:err.message})
    }
    

}


// Sign Up Control
const signUp = async (req,res) => {
    const {gmail,password} = req.body
    try{
const CreateUser = await UserSchema.SignUp(gmail,password)

// Create Token
const token = createToken(CreateUser._id)

res.status(200).json({gmail,token})
    }catch(err){
        res.status(400).json({signUpErr:err.message})
    }   
}

module.exports = {logIn,signUp,AllUsers}