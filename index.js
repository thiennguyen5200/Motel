const express = require('express')
const app = express()
const parser = require('body-parser').json()
const cors = require('cors');

app.use(parser)
app.use(cors());

const {authenticate} = require('./lib/authenticte') 
require('./lib/dbconnect')

const userRouter = require('./controllers/user.router')
const motelRouter = require('./controllers/motel.router')
const roomRouter = require('./controllers/room.router')
const { UserModel } = require('./models/User.model')
app.use('/user',userRouter)
app.use('/motel',authenticate,motelRouter)
app.use('/room',authenticate,roomRouter)

app.get('/',(req,res)=>{
    res.send({
        status:'Success',
        data: null,
        message: 'Server started'
    })
})

app.get('/manager/user',async (req,res)=>{
    const users = await UserModel.find({})
    res.send({ success: true, users });
})
const PORT = 5000
app.listen(PORT,()=> console.log(`Server star on port ${PORT}`))