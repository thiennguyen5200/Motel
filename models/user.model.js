const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hash, compare} = require('../lib/bcrypt')
const {sign} = require('../lib/jwt')

const UserSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    lever: Number,
    avatar:{
        type: String,
        default:'user-default.png'
    },
    name: String,
    phone: String,
    card_id:{
        type: String,
        required: true,
        unique:true
    },
    motels:[{
        type: Schema.Types.ObjectId,
        ref:'motel'
    }],
    rooms:[{
        type: Schema.Types.ObjectId,
        ref:'room'
    }],
    address: String,
    job: String,
    sex: Boolean,
    birth_day: Date,
    deposit: Number,
    status: Boolean,
    star_date: Date,
    end_date: Date,
    create_date:{
        type: Date,
        default: Date.now
    }
})
const UserModel = mongoose.model('user',UserSchema)

class User{
    static async signUp(email, password, name, card_id){
        const passwordHash = await hash(password)
        if(!passwordHash) throw new Error('Cannot create user!')
        const user = await UserModel.create({ email, password: passwordHash, name, card_id })
        if(!user) throw new Error('Cannot create user!')
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            card_id: user.card_id
        }
    }
    static async signIn(email, password){
        const user = await UserModel.findOne({email})
        if(!user) throw new Error('Cannot find user!')
        const check = await compare(user.password, password)
        if(!check) throw new Error('Password invalid!')
        const token = await sign({_id: user._id})
        if(!token) throw new Error('Cannot sign token!')
        return {
            user:{
                _id: user._id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                card_id: user.card_id
            }
        },
        token
    }
}

module.exports = { UserModel, User }