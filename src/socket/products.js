const productsEvents = (socketServer) => {
    socketServer.on('connection', (socket) => {
        // Corroboramos conexión servidor-cliente
        console.log(`Cliente conectado: ${socket.id}`)
        socket.on('evName', async (data) => { ////
            await productModel.create(data);
            const products = await productModel.find().lean();
            //console.log(products);
            // Enviamos lista de productos al cliente para  
            // que la muestre desde websocket
            socketServer.emit("displayProducts", products)
      });
    });
  };
  
  export default productsEvents;