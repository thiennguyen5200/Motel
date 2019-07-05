const { UserModel } = require('../models/User.model')
const { RoomModel } = require('../models/Room.model')
const { MotelModel } = require('../models/Motel.model')

class Motel{
    static async createMotel(author,motel_name,address,county,city,district,qty_room){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error('Cannot find author!')
        const motel = await MotelModel.create({author,motel_name,address,county,city,district,qty_room})
        if(!motel) throw new Error('Cannot create Motel')
        for (let index = 0; index < motel.qty_room; index++) {
            const roomInsert = await RoomModel.create(
                {
                    name:`Room ${index + 1}`,
                    status: true,
                    enter_date: Date.now(),
                    motel: motel._id
                }
            )
            const motelUpdate = await MotelModel.findByIdAndUpdate(
                {_id:motel._id},
                {
                    $addToSet:{rooms:roomInsert._id}
                },
                {new : true}
            )
        }
        
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id:author},
            {
                $addToSet: {motels: motel._id}
            }
        ).select('email name')
        return {motel,userUpdate}
    }
    
    static async updateMotel(author,_id,motel_name,address,county,city,district,status){
        const motel = await MotelModel.findOneAndUpdate(
            {_id,author},
            {
                motel_name, 
                address, 
                county, 
                city, 
                district,
                status
            },
            {new:true}
        )
        if(!motel) throw new Error(`Can't update motel!`)
        return motel
    }
}

module.exports = { Motel }
