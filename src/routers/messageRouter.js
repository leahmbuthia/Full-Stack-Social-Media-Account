import { Router } from 'express';
import { getMessages, createMessage, updateMessage, getMessageById, deleteMessage } from "../controller/messageController.js"; // Import message controller functions

const messagesRouter = Router(); // Rename router to messagesRouter

messagesRouter.get('/messages', getMessages); // Update route for getting messages
messagesRouter.post('/messages', createMessage); // Update route for creating messages
messagesRouter.put('/messages/:messageID', updateMessage); // Update route for updating messages
messagesRouter.get('/messages/:messageID', getMessageById); // Update route for getting a specific message by ID
messagesRouter.delete('/messages/:messageID', deleteMessage); // Update route for deleting messages

export default messagesRouter; // Export the updated messagesRouter
