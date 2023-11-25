import mongoose from "mongoose";

type Chat = {
  timestamp: Date;
  content: Date;
  senderId: string;
  recieverId: string;
};
interface Chats extends mongoose.Document {
  roomId: string;
  userId1: string;
  userId2: string;
  messages: {
    type: Array<Chat>;
  };
}

const chatSchema = new mongoose.Schema<Chats>({
  roomId: {
    type: String,
    required: true,
  },
  userId1: {
    type: String,
    required: true,
  },
  userId2: {
    type: String,
    required: true,
  },
  messages: {
    type: Array<Chat>,
    default: [],
  },
});
