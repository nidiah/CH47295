const chatEvents = (socketServer) => {
    socketServer.on('connection', (socket) => {
      console.log('Se conectó', socket.id);
      socket.on('message', async (data) => {
        await messageModel.create(data);
        const messages = await messageModel.find().lean();
        console.log(messages);
        socketServer.emit('newMessage', messages);
      });
    });
  };
  
  export default chatEvents;