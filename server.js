require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Routes
const jobs = require('./Routes/jobs')
const users = require('./Routes/users')
const createJob = require('./Routes/createJob')
const forgetPass = require('./Routes/forgetPassword')

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(7777,()=>{
        console.log(`App is running`)
    })    
}).catch(err=>console.log('Mognodb',err))


// Routes
app.use(express.json())
app.use(cors())
app.use('/jobs',jobs)
app.use('/forgetpassword',forgetPass)
app.use('/users',users)
app.use('/usermenu',createJob)
