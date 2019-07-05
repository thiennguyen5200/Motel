const express = require('express')
const router = express.Router()
const {Room} = require('../repositorys/Room.repository')
const {Motel} = require('../repositorys/Motel.repository')

router.post('/create',(req,res)=>{
    const {idMotel,name} = req.body
    const author = req.idUser
    Motel.createRoom(author,idMotel,name)
    .then(room=>res.send({
        code: 1,
        data: room,
        message:''
    }))
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
})

router.post('/update',(req,res)=>{
    const {_id,idMotel,name} = req.body
    const author = req.idUser
    Room.updateRoom(author,idMotel,_id,name,status,enter_date)
    .then(room=>res.send({
        code: 1,
        data: room,
        message:''
    }))
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
})
module.exports = router
