const mongoose = require('mongoose')
const Schema = mogoose.Schema

const ServiceSchema = new Schema({
    roomdetail:{
        type: Schema.Types.ObjectId,
        ref: 'room_detail'
    },
    name: String,
    status: Boolean,
    price:{
        type: Schema.Types.ObjectId,
        ref:'price'
    }
})
const ServiceModel = mongoose.model('service',ServiceSchema)

module.exports = {ServiceModel}
