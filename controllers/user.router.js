const express = require('express')
const router = express.Router()
const {User} = require('../repositorys/User.ropository')

router.get('/register',(req,res)=>{
    res.send({
        status:'Success',
        data: null,
        message: 'Server started'
    })
})
router.post('/register',(req,res)=>{
    const { email, password, name, card_id } = req.body
    User.signUp(email, password, name, card_id)
    .then(user=>res.send({
        code: 1,  // 1: Success, 0: error
        data: user,
        message: 'Success!'
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})

router.post('/login',(req,res)=>{
    const {email, password} = req.body
    User.signIn(email,password)
    .then(user => res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(err=> res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})

router.get('/', (req,res)=>{
    User.getAllUser()
    .then(user => res.send({
        code: 1,
        data: user,
        message: ''
    }))
    .catch(err => res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})

module.exports = router
