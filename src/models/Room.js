import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  chatId: { type: String, require: true, default: '0' },
  messages: [ 
    {
      sender: {type: String}, 
      senderId: {type: String}, 
      data: {type: String}, 
    }]
}, {timestamp: true} )

export default mongoose.model('Room', roomSchema)