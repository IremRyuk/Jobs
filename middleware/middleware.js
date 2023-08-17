const jwt = require('jsonwebtoken')
const UserSchema = require('../Schema/UsersSchema')
const middlewareAuth = async (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(400).json({authorizationError:'Error in Headers Autenth...'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token,process.env.SECRET)

        req.user = await UserSchema.findOne({_id}).select('_id')
        next()
    } catch (error) {
        res.status(401).json({error:'Error In Verifing'})
    }
}
module.exports = middlewareAuth