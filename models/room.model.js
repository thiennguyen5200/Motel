const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    authors:[{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    motel:{
        type: Schema.Types.ObjectId,
        ref:'motel'
    },
    name: String,
    status: Boolean,
    enter_date: Date,
    service:[{
        type: Schema.Types.ObjectId,
        ref: 'service'
    }]
})
const RoomModel = mongoose.model('room',RoomSchema)

module.exports = {RoomModel}