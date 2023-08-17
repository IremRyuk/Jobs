const express = require('express')
const router = express.Router()
const middlewareAuth = require('../middleware/middleware')
const {NewData,GetUserAllJobs} = require('../controlers/jobsController')


// middleware
router.use(middlewareAuth)

router.post('/',NewData)
router.get('/myjobs',GetUserAllJobs)
module.exports = router