const UserSchema = require('../Schema/UsersSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const nodemailers = require('./nodeMailer')

// Create Token
const CreateToken = (id) => {
return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'15m'})
}

// Forget
const ForgetPassword = async (req,res) => {
    const {gmail} = req.body

    if(!gmail){
        res.json({Status:'Please Fill Input'})
        return
    }

    if(!validator.isEmail(gmail)){
        res.json({Status:'Please Check Gmail'})
        return
    }

    const user = await UserSchema.findOne({gmail})
    
    if(!user){
        res.json({Status:'Gmail Is Not Correct'})
        return
    }

    if(user){
const token = CreateToken(user._id)
const link = `https://ryukjobs.netlify.app/resetpassword/${user._id}/${token}`
nodemailers(gmail,link)
res.json({Status:'Link Sent In Gmail',St2:true})
    }
}



// Reset
const ResetPassword = async (req,res) => {
    const {id,token} = req.params
    const {password} = req.body
    if(!password){
        res.json({Status:'Fill Input'})
        return
    }
    if(!validator.isStrongPassword(password)){
        res.json({Status:'Password is not strong enough'})
        return
    }

    const _id = id
    const user = await UserSchema.findOne({_id})
    if(!user){
        res.json({Status:'User is not valid'})
        return
    }
    if(user){
        const jwts = jwt.verify(token,process.env.SECRET)
        if(jwts){
            const salt = await bcrypt.genSalt(7)
            const hash = await bcrypt.hash(password,salt)
            const newuserPassword = await UserSchema.findByIdAndUpdate({_id:id},{password:hash})
            if(newuserPassword){
                res.json({Status:'Success: Changed Password',St2:true})
            }else{
                res.json({Status:'Denied: Changed Password'})
            }
        }else{
            console.log('Not Verified By JWT')
        }
    }
}



module.exports = {ForgetPassword,ResetPassword}
