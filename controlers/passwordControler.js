const UserSchema = require('../Schema/UsersSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

// Create Token
const CreateToken = (id) => {
return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'15m'})
}


// Forget
const ForgetPassword = async (req,res) => {

    const {gmail} = req.body

    if(!gmail){
        res.json({Status:'Please Fill Input'})
    }

    if(!validator.isEmail(gmail)){
        res.json({Status:'Please Check Gmail'})
    }

    const user = await UserSchema.findOne({gmail})
    
    if(!user){
        res.json({Status:'Gmail Is Not Correct'})  
    }

    if(user){
const token = CreateToken(user._id)
const link = `localhost:3000/resetpassword/${user._id}/${token}`
// Send Link On Gmail
res.json({Status:'Password Reset Link Has Been Sent In Gmail ' + link})
    }
}

// Reset
const ResetPassword = async (req,res) => {
    const {id,token} = req.params
    const {password} = req.body
    const _id =  id
    const user = await UserSchema.findOne({_id})
    if(!user){
        res.json({Status:'User is not valid'})
    }
    if(user){
        const jwts = jwt.verify(token,process.env.SECRET)
        if(jwts){
            const salt = await bcrypt.genSalt(7)
            const hash = await bcrypt.hash(password,salt)
            const newuserPassword = await UserSchema.findByIdAndUpdate({_id:id},{password:hash})
            if(newuserPassword){
                res.json({Status:'Success: Changed Password'})
            }else{
                res.json({Status:'Denied: Changed Password'})
            }
        }else{
            console.log('Not Verified By JWT')
        }
    }
}



module.exports = {ForgetPassword,ResetPassword}
