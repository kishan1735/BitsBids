import mongoose from "mongoose";

type Chat = {
  timestamp: Date;
  content: Date;
  senderId: string;
  recieverId: string;
};

const chats = new mongoose.Schema({
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  chat: {
    type: String,
  },
});

const chatSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  buyer: {
    type: String,
  },
  buyRandomId: {
    type: String,
  },
  seller: {
    type: String,
  },
  sellRandomId: {
    type: String,
  },
  messages: {
    type: [chats],
    default: [],
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
