const mongoose = require('mongoose')
const validator = require('validator')


const psychSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxlength: [25, "limit crossed"],
        minlength: [2, "atleast 2 words required"],
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        maxlength: [25, "limit crossed"],
        minlength: [2, "atleast 2 words required"],
        trim: true
    },
    email:{
        type: String,
        maxlength: [255, "limit Crossed"],
        required: true,
        unique: true,
        validate: [validator.isEmail, "emter the valid email address "]
    },
    specialization:{
        type: String,
        trim: true,
        required: true
    },
    experience:{
        type: String,
        trim: true,
        required: true
    },
    hour:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
            type: String,
            required: true
   },
   images:{
    type: Object,
    default: ""
   }
}, {timestamps: true})

module.exports = mongoose.model("psych", psychSchema)