const mongoose = require('mongoose')
const Schema = mongoose.Schema
const JobsSchema = new Schema({
    companyName:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('jobs',JobsSchema)