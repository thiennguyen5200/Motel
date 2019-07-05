const { UserModel } = require('../models/User.model');
const { MotelModel } = require('../models/Motel.model');

class Room{
    static async createRoom(author, idMotel, name){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error(`Tài khoản này không tồn tại`);

        const motelFind = await MotelModel.findOne({_id: idMotel})
        if(!motelFind) throw new Error(`Dãy trọ này không tồn tại`);

        // const checkRoomName = await RoomModel.find({authors:author})
        // const room = await RoomModel.create({name,status:true,enter_date:Date.now()})
        // if(!room) throw new Error('Không thể tạo phòng!')
        // const userUpdate = await UserModel.findByIdAndUpdate(
        //     {_id:author},
        //     {
        //         $addToSet:{rooms:room._id}
        //     },
        //     {new:true}
        // ).select('email name')
        // if(!userUpdate) throw new Error('Không thể tạo phòng!')
        // return {room,userUpdate}
    }
    static async updateRoom(author, idMotel, _id, name, status, enter_date){
        const user = await UserModel.findOne({_id: author, motels:idMotel})
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
module.exports = {Room}