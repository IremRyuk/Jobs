const express = require('express')
const router = express.Router()
const {getAllData,getSingleData,UpdateSingleValue,DeleteSingleData} = require('../controlers/jobsController')


// routes
router.get('/',getAllData)
router.get('/:id',getSingleData)
router.put('/:id',UpdateSingleValue)
router.delete('/myjobs/:id',DeleteSingleData)


module.exports = router