const express = require('express')
const app = express()
const parser = require('body-parser').json()
app.use(parser)
const {authenticate} = require('./lib/authenticte') 
require('./lib/dbconnect')

const userRouter = require('./controllers/user.router')
const motelRouter = require('./controllers/motel.router')
const roomRouter = require('./controllers/room.router')

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


const PORT = 5000
app.listen(PORT,()=> console.log(`Server star on port ${PORT}`))