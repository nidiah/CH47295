import mongoose from 'mongoose';

const messageCollection = 'mensajes';

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const messageModel = mongoose.model(messageCollection, messageSchema);
export { messageModel };