const express = require('express')
const router = express.Router()
const {Motel} = require('../repositorys/Motel.repository')

router.post('/create',(req,res)=>{
    const author = req.idUser
    const {motel_name, address, city, county, district ,qty_room} = req.body
    Motel.createMotel(author,motel_name,address,county,city,district,qty_room)
    .then(motel=>res.send({
        code: 1,
        data: motel,
        message:''
    }))
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
})

router.post('/update',(req,res)=>{
    const author = req.idUser
    const {_id,motel_name,address,county,city,district,status} = req.body
    Motel.updateMotel(author,_id,motel_name,address,county,city,district,status)
    .then(motel=>res.send({
        code:1,
        data:motel,
        message:''
    }))
    .catch(err=>res.send({
        code:0,
        data:null,
        message:err.message
    }))
})

module.exports = router