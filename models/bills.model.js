const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BillSchema = new Schema({
    room:{
        type: Schema.Types.ObectId,
        ref:'room'
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    total: Number,
    status: Boolean,
    create_date: {
        type:Date,
        default: Date.now
    }
})
const BillModel = mongoose.model('bill',BillSchema)

module.exports = {BillModel}