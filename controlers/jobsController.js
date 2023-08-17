const JobsSchema = require('../Schema/JobsSchema')
const mongoose = require('mongoose')


const getAllData = async (req,res) => {
        const allData = await JobsSchema.find().sort({createdAt:-1})
        res.status(200).json(allData)
}





const getSingleData = async (req,res) => {
        const {id} = req.params
        const singleData = await JobsSchema.findById(id)
        res.status(200).json(singleData)
}




const NewData = async (req,res) => {
        const userId = req.user._id
        const {companyName,position,description,salary,experience,location,gmail} = req.body
        try{
            const newData = await JobsSchema.create({companyName,position,description,salary,experience,location,gmail,userId})
            res.status(200).json({newData})
        }catch(err){
            console.log('New Posty Error',err)
        }
        
}




const UpdateSingleValue = async (req,res) => {
        const {id} = req.params

        // if params id is not valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log('params id is not valid')
            return res.status(404).json({error:'params id is not valid'})
        }

        // if params id is valid then
        try{
            const updataSingleItem = await JobsSchema.findByIdAndUpdate({_id:id},{...req.body})
            res.status(200).json({updated:updataSingleItem})
        }
        catch(err)
        {console.log(`${err} in single item update`)}
}





const DeleteSingleData = async (req,res) => {
        const id = req.params.id
    
        // Check if params id is Valid
        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log(`params id ${id} is not valied`)
            return res.status(404).json({error:'params id is not valid'})
        }
    
        // if Everything OK, delete item
        const deleteItem = await JobsSchema.findByIdAndDelete(id)
        res.status(200).json({deletedItemIs:deleteItem})
}

// Get User's Jobs
const GetUserAllJobs = async (req,res) => {
       const userId = req.user._id
       const UserJobs = await JobsSchema.find({userId}).sort({createdAt:-1})
       res.status(200).json(UserJobs)
}


module.exports = {
    getAllData,
    getSingleData,
    DeleteSingleData,
    UpdateSingleValue,
    NewData,
    GetUserAllJobs
}