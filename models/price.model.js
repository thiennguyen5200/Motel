const mongoose = require('mongoose')
const Schema = mogoose.Schema

const PriceSchema = new Schema({
    service:{
        type: Schema.Types.ObjectId,
        ref:'service'
    },
    Price: Number
})
const PriceModel = mongoose.model('price',PriceSchema)

module.exports = {PriceModel}
