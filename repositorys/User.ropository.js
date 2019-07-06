const {hash, compare} = require('../lib/bcrypt')
const {sign} = require('../lib/jwt')
const {UserModel} = require('../models/User.model')

class User{
    static async signUp(email, password, name, card_id){
        const passwordHash = await hash(password)
        if(!passwordHash) throw new Error('CANNOT_FIND_USER!')
        const user = await UserModel.create({ email, password: passwordHash, name, card_id, level: 1, create_by: 'None' })
        if(!user) throw new Error('CANNOT_CREATE_USER!')
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
        if(!user) throw new Error('CANNOT_FIND_USER!')
        const check = await compare(user.password, password)
        if(!check) throw new Error('PASSWORD_INVALID!')
        const token = await sign({_id: user._id})
        if(!token) throw new Error('CANNOT_SIGN_TOKEN!')
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
    static async getAllUser(){
        const users = await UserModel.find({})
        if(users !== null){
            return users
        }
        throw new Error ('LIST_USER_IS_NULL!')
    }
}
module.exports = { User }
