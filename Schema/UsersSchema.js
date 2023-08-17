const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    gmail:{
        type:String,
        required:true,
        uniqure:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})



// login
UserSchema.statics.login = async function(gmail,password){
    if(!gmail || !password){
        throw Error('Login: Please Fill Inputs')
    }
    const User = await this.findOne({gmail})
    if(!User){
        throw Error('Login: Gmail Has Not Found')
    }
    
    const CheckPassword = await bcrypt.compare(password,User.password)
    if(!CheckPassword){
        throw Error('Login: Password Is Incorrect')
    }
    return User

}



// signup
UserSchema.statics.SignUp = async function(gmail,password){
    // Check if Inputs Are Filled
if(!gmail || !password){
    throw Error('Please Fill Inputs')
}
// Check if Email is Valid
if(!validator.isEmail(gmail)){
    throw Error('Please Check Gmail')
}
// Check if Password is Valid
if(!validator.isStrongPassword(password)){
    throw Error('Please Check Password')
}


const exists = await this.findOne({gmail})
if(exists){
    throw Error('Email Exists In DataBase')
}
const salt = await bcrypt.genSalt(7)
const hash = await bcrypt.hash(password,salt)

const CreateUser = await this.create({gmail,password:hash})
return CreateUser
}



module.exports = mongoose.model('users',UserSchema)