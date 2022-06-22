import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import roomHandler from './handler/roomHandler.js'
import mongoose from 'mongoose'
import chatHandler from './handler/chatHandler.js'

mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {}
})



const onConnection = (socket) => {
  socket.on('ping', (msg) => {
    console.log('Pong!',msg)
    socket.emit('pong')
  })

  roomHandler(io, socket)
  chatHandler(io, socket)

}

app.get('/', (req, res) => {
  res.send('Service is online.')
})


io.on('connection', onConnection)

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
