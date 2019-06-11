const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UserModel } = require('./user.model');
const { RoomModel } = require('./room.model')

const RoomSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    motel_name:{
        type: String,
        required: true
    },
    address: String,
    county:String,
    city:String,
    district:String,
    rooms:[{
        type: Schema.Types.ObjectId,
        ref:'room'
    }],
    qty_room:Number,
    status: Boolean
})
const MotelModel = mongoose.model('motel',RoomSchema)

class Motel{
    static async createMotel(author,motel_name,address,county,city,district,qty_room){
        const user = await UserModel.findOne({_id: author})
        if(!user) throw new Error('Cannot find author!')
        const motel = await MotelModel.create({author,motel_name,address,county,city,district,qty_room})
        if(!motel) throw new Error('Cannot create Motel')
        for (let index = 0; index < motel.qty_room; index++) {
            const createRoomDetails = await RoomModel.create(
                {
                    name:`Room ${index}`,
                    status: true,
                    enter_date: Date.now(),
                    motel: motel._id
                }
            )
        }
        
        const userUpdate = await UserModel.findByIdAndUpdate(
            {_id:author},
            {
                $addToSet: {motels: motel._id}
            }
        )
        return {motel,userUpdate}
    }

    static async updateMotel(author,_id,motel_name,address,county,city,district){
        const motel = await MotelModel.findOneAndUpdate(
            {_id,author},
            {
                motel_name, 
                address, 
                county, 
                city, 
                district
            },
            {new:true}
        )
        if(!motel) throw new Error(`Can't update motel!`)
        return motel
    }
}
module.exports = {MotelModel, Motel}