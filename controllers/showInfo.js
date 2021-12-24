const shows = require('../models/shows.js')
const bcrypt = require('bcryptjs');

const newProduct = async (req,res) => {
    const data = req.body 
    try {
        const result = await shows.create(data)
        res.status(200).json({result})
    } catch (error) {   
        console.log(error)
        res.status(500).json({message:"Something Went Wrong"})
    }
}
const updateProfile = async (req,res) => {
    const data = req.body 
    const {id}   = req.params
    try {
        encryptedPassword = await bcrypt.hash(data.password, 10);
        
        const mdata = {
            username: data.username,
            email : data.email,
            password : encryptedPassword,
            isDeleted: false,
            addTime: new Date().toISOString()
        }
        console.log("result", mdata)
        const result = await shows.findByIdAndUpdate(id, {...mdata, id }, { new:true })
        console.log("result", result)
        let success = true;
        res.status(200).json({result, success})
    } catch (error) {   
        console.log(error)
        res.status(500).json({message:"Something Went Wrong"})
    }
}
const showData = async (req,res) => {
    try {
        const data = await shows.find({});
        if(data){
            let newdata = data.filter((item)=> {
                console.log(item);

            })
            res.status(200).json({data})
            
        }
        else {
            res.status(400).json({data})
        }
    } catch (error) {   
        res.status(500).json({message:"Something Went Wrong"})
    }
}
const deleteProfile = async(req,res) => {
    const {id}   = req.params

    console.log(id)

    const data = await shows.findOneAndDelete({_id : id});
    console.log(data)
    console.log('deleted successfully')

    res.json({message:"Product Deleted Successfully"})
}
const getSingleProductData = async (req,res) => {
    try {
        const {id} = req.params;
        console.log("THIS IS AN ID HERE =====", id)
        const data = await shows.findById(id);
        console.log(data)
        let success = true;
        if(data){
            res.status(200).json({data, success})
        }
        else {
            res.status(400).json({data})
        }
    } catch (error) {   
        res.status(500).json({message:"Something Went Wrong"})
    }
    
    // console.log("this is req",req)
}
module.exports = {newProduct, updateProfile,showData, deleteProfile, getSingleProductData}