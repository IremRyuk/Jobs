const express = require('express')
const router = express.Router()
const {ForgetPassword,ResetPassword} = require('../controlers/passwordControler')
router.post('/',ForgetPassword)
router.post('/:id/:token',ResetPassword)
module.exports = router