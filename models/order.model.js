const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    fullname: String,
    email: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    message:String,
    display:Boolean,
    status:Boolean
})