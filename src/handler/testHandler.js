export default (io, socket) => {
  const testReply = () => {
    console.log('Replying user.')
    socket.broadcast.emit('test')
  }

  socket.on('test:replay', testReply)
}