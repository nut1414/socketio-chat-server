import Room from '../models/Room.js'

const getRoom = (socket) => ([...socket.rooms].slice(1,)[0])?.toLowerCase()

export default (io, socket) => {
  const getAllMsg = async () => {
    const normIdRoom = getRoom(socket)
    if(normIdRoom) {
      console.log('Requesting all message from room:',normIdRoom)
      const currentRoom = await Room.findOne({chatId: normIdRoom})
      console.log(currentRoom.messages)
      socket.emit('chat:msgs',currentRoom.messages)
    }else{
      console.log('Not getting room')
    }
    
  }
  const addMsg = async (sendmsg) => {
    const normIdRoom = getRoom(socket)
    if(normIdRoom) {
      console.log('Adding message to room:',normIdRoom)
      const currentRoom = await Room.findOneAndUpdate({chatId: normIdRoom},{ $push: { messages: sendmsg } },{ new: true })
      console.log(currentRoom.messages)
      io.to(normIdRoom).emit('chat:msgs', [currentRoom.messages[currentRoom.messages.length-1]])
    }else{
      console.log('Not getting room')
    }
  }

  socket.on('chat:getall', getAllMsg)
  socket.on('chat:addmsg', addMsg)
}