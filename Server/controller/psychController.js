const Psych = require('../models/Psychiatrist')
const util = require('util')
const jwt = require('jsonwebtoken')

const tokens = req => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        return token = req.headers.authorization.split(" ")[1]

    }
}

//decoding token to find userid
const tokenId = async token => {
    const decode = await util.promisify(jwt.verify)(token, "secret")
    const idDecode = decode.id
    return idDecode
}

const applyDoctorCtrl = {

    applyDoctor : async(req,res,next)=>{
        try{
            const{firstName, lastName, email,specialization, experience,hour,description, images} = req.body;
            if(!images)
            return res.status(400).json({msg: "No image uploaded"})

            const newPsych = new Psych({
                firstName,lastName,email,specialization,experience,hour,description,images
            })

            await newPsych.save()
            res.json({msg: "Your form has been successfully sent for doctor application"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    getApplication: async(req,res)=>{
        try{
            const doctorApplications =  await Psych.find()
            res.json(doctorApplications)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    deleteApplication: async(req,res)=>{
        try{
            await Psych.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a doctor Application"})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updatedoctorApplication: async(req,res)=>{
        try{
            const {firstName, lastName, email, specialization, experience, hour, description, images } = req.body;
            if(!images)
            return res.status(400).json({msg: "No image uploaded"})

            await Psych.findByIdAndUpdate({_id: req.params.id},{
                firstName,lastName,email,specialization,experience,hour,description,images
            })
            res.json({msg: "Updated the doctor application"})

        }catch(err){
            return res.status(500).json({msg: err.message})      
        }
    }
    

}

module.exports = applyDoctorCtrl