const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { UserModel } = require('./user.model');
const { MotelModel } = require('./motel.model')
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

class Room{
    static async createRoom (author, idMotel, name){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error(`Tài khoản này không tồn tại`)
        const motel = await MotelModel.findOne({_id: idMotel})
        if(!motel) throw new Error(`Dãy trọ này không tồn tại`)
        const room = await RoomModel.create({name,status:true,enter_date:Date.now()})
        if(!room) throw new Error('Không thể tạo phòng!')
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id:author},
            {
                $addToSet:{rooms:room._id}
            },
            {new:true}
        )
        if(!userUpdate) throw new Error('Không thể tạo phòng!')
        return {room,userUpdate}
    }
    static async updateRoom(author, idMotel, _id, name, enter_date){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error(`Tài khoản này không tồn tại`)
        const motel = await MotelModel.findOne({_id: idMotel})
        if(!motel) throw new Error(`Dãy trọ này không tồn tại`)
        const room = await RoomModel.findByIdAndUpdate(
            { _id: _id },
            {
                name, status, enter_date
            },
            { new: true }
        )
        if(!room) throw new Error(`Quá trình update có phát sinh lỗi`)
        return {room}
    }
}

module.exports = {RoomModel, Room}