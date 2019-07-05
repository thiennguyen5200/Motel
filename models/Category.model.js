const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name:String,
    images:{
        type: String,
        default:'category-default.png'
    },
    parentId: Number,
    status:Boolean
})
const CategoryModel = mongoose.model('category',CategorySchema)
