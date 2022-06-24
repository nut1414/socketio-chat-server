import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  chatId: { type: String, require: true, default: '0' },
  messages: [ 
    {
      sender: {type: String}, 
      senderId: {type: String}, 
      data: {type: String}, 
      content: {type: String}, 
      contentType: {type: String}, 
      'timestamp': {type: Number}
    }]
}, {timestamp: true} )

export default mongoose.model('Room', roomSchema)