import express from "express";
import Chat from "../models/chatsModel.mjs";
import { query } from "../utils/aiResponse.mjs";
import { checkName } from "../utils/utilFunction.mjs";

const router = express.Router();

// To get all the chats from database
router.get('/', async (req, res) => {
  try {
    const chats = await Chat.find({}).sort({ updatedAt: -1 }); // returns an array of objects

    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      data: chats
    });
  } catch (error) {
    console.error("Error occured while fetching the chats: ", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
});

// To create a new chat
router.post("/", async (req, res) => {
  try {
    const data = await Chat.find({});
    let name = checkName("New Chat", data);

    const newChat = await Chat.create({ name });

    res.status(201).json({
      success: true,
      message: "Chat created successfully!",
      data: newChat,
    });
  } catch (error) {
    console.error("Error occured while creating a chat: ", error);

    res.status(500).json({
      success: false,
      message: "Failed to create chat",
      error: error.message
    });
  }
});

// To get a particular chat
router.get('/:id', async (req, res) => {
  const chatId = req.params.id;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat Not Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat is found!",
      data: chat,
    })
  } catch (error) {
    console.error(`Error occured while searching for ${chatId} : ${error}`);

    res.status(500).json({
      success: false,
      message: "Failed to fetch chat",
      error: error.message
    });
  }
})

// To delete a particular chat
router.delete('/:id', async (req, res) => {
  const chatId = req.params.id;

  try {
    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat Deleted!",
      data: chat,
    })
  } catch (error) {
    console.error(`Error occured while deleting ${chatId} : ${error}`);

    res.status(500).json({
      success: false,
      message: "Failed to delete chat!",
      error: error.message
    });
  }
})

// To rename a particular chat
router.patch('/:id', async (req, res) => {
  const chatId = req.params.id;
  let chatName = req.body.newName;

  if (!chatName || chatName.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Chat name cannot be empty"
    });
  }

  try {
    const data = await Chat.find({});
    chatName = checkName(chatName, data);

    const chat = await Chat.findByIdAndUpdate(chatId, { name: chatName }, { new: true });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Chat name updated with ${chat.name}`,
      data: chat,
    });
  } catch (error) {
    console.error(`Error occured while renaming for ${chatId} : ${error}`);

    res.status(500).json({
      success: false,
      message: "Failed to rename chat",
      error: error.message
    });
  }
})

// To update a chat because of messages
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const user = req.body.msg;

  if (!user || user.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Message cannot be empty"
    });
  }

  try {
    const chat = await Chat.findById(id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat Not Found!"
      });
    }

    const result = await query(user);
    // console.log("result: ", result);

    if (result.ok) {
      return res.status(result.status || 500).json({
        success: false,
        message: "AI API Error",
        error: result.data
      });
    }

    const reply = result.data?.choices[0].message.content;

    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      {
        $push: {
          data: { user, ai: reply },
        },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Chat updated Successfully!",
      data: updatedChat
    });
  } catch (error) {
    console.error(`Error occured while updating the chat with id ${id}: ${error}`);

    res.status(500).json({
      success: false,
      message: "Failed to update chat",
      error: error.message
    });
  }
});

export default router;
