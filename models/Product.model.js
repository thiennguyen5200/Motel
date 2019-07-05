const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: String,
    images: {
        type: String,
        default:'category-default.png'
    },
    price_in:Number,
    price_out:Number,
    price_sale:Number,
    color: String,
    hot: Boolean,
    description: String,
    view_count:Number,
    status:Boolean,
    category:[{
        type: Schema.Types.ObjectId,
        ref: 'category'
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

