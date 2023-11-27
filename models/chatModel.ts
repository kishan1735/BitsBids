import mongoose from "mongoose";

type Chat = {
  timestamp: Date;
  content: Date;
  senderId: string;
  recieverId: string;
};
interface Chats extends mongoose.Document {
  productId: string;
  seller: string;
  buyer: string;
  messages: {
    type: Array<Chat>;
  };
}

const chats = new mongoose.Schema({
  to: {
    type: String,
    enum: ["Buyer", "Seller"],
  },
  from: {
    type: String,
    enum: ["Buyer", "Seller"],
  },
  time: {
    type: Date,
    default: Date.now(),
  },
});
const messageSchema = new mongoose.Schema({
  buyer: String,
  messages: {
    type: [chats],
    default: [],
  },
});
const chatSchema = new mongoose.Schema<Chats>({
  productId: {
    type: String,
    required: true,
  },
  messages: {
    type: [messageSchema],
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
