import chatEvents from './socket/chat.js';
import productsEvents from './socket/products.js';
import cartsEvents from './socket/carts.js';

const init = (socketServer) => {
  chatEvents(socketServer);
  productsEvents(socketServer);
  cartsEvents(socketServer);
};

export default init;