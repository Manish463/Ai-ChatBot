import mongoose from 'mongoose';

const chatsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: [
      {
        user: { type: String },
        ai: { type: String }
      },
    ]
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatsSchema);

export default Chat