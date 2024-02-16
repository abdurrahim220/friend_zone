import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // console.log("Message: ",message)
    const { id: receiverId } = req.params;
    const senderId = req.user_id;

    console.log(receiverId, senderId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: { $all: [senderId, receiverId] },
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // todo socket io

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!!" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user_id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.message);
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error!!" });
  }
};
