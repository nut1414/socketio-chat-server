import Room from '../models/Room.js'

export default (io, socket) => {
  const joinRoom = async (roomId) => {
    if (typeof roomId === 'string'){
      console.log('Joining client to room:', roomId)
      const normIdRoom = roomId.toLowerCase()
      const option = { upsert: true, new: true, setDefaultsOnInsert: true }
      const currentRoom = await Room.findOneAndUpdate({chatId: normIdRoom}, {chatId: normIdRoom}, option)
      if (currentRoom){
        socket.join(roomId)
        socket.emit('join:success')
      }
    }
  }

  socket.on('join', joinRoom)
}