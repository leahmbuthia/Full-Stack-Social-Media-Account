import { getMessagesService,addMessageService ,getMessageByIdService, updateMessageService, deleteMessageService  } from "../services/messageService.js"; // Import the message services
import {v4} from 'uuid';
import { sendNotFound, sendSeverError, sendCreated } from "../helper/helperFunctions.js";
import { createMessageValidator } from "../validators/messageValidator.js";
export const getMessages = async (req, res) => {
    try {
        const data = await getMessagesService(); // Fetch messages instead of users
        if (data.length === 0) {
            sendNotFound(res, 'No messages found');
        } else {
            if (!req.query.page || !req.query.limit) {
                if (req.query.order) {
                    res.status(200).json(orderData(data, req.query.order));
                } else {
                    res.status(200).json(data);
                }
            } else {
                if (req.query.order) {
                    paginate(orderData(data, req.query.order), req, res);
                } else {
                    paginate(data, req, res);
                }
            }
        }

    } catch (error) {
        sendSeverError(res, error);
    }
};

export const createMessage = async (req, res) => {

    try {
        const { SenderID, ReceiverID, Content } = req.body;
        // Validate input parameters
        const MessageID = v4();
        const { error } = createMessageValidator(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
         
     
        const newMessage ={
            MessageID,
            SenderID,
            ReceiverID,
            MessageDate: new Date(),
            Content,
        };
console.log(newMessage);
        // Calogll message service to add the message
        const response = await addMessageService(newMessage);

        if (response.message) {
            // If message service returns an error message
            return sendSeverError(res, response.message);
        } else {
            // If message creation is successful
            sendCreated(res, 'Post created successfully');
        }
    } catch (error) {
        sendSeverError(res, error.message);
    }
};

export const getMessageById = async (req, res) => {
    try {
        const messageID = req.params.messageID; // Updated to messageID
        const message = await getMessageByIdService(messageID); // Updated to getMessageByIdService

        if (message) {
            return res.status(200).json({ message });
        } else {
            return res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { Content } = req.body;
        const messageID = req.params.messageID;
        const messageToUpdate = await getMessageByIdService(messageID);

        if (!messageToUpdate) {
            return sendNotFound(res, 'Message not found');
        } else {
            if (!Content) {
                return sendSeverError(res, 'Please provide a complete message');
            }
            messageToUpdate.Content = Content;
            await updateMessageService(messageToUpdate);
            return sendCreated(res, 'Message updated successfully');
        }
    } catch (error) {
        return sendSeverError(res, error.message);
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const messageID = req.params.messageID;
        const result = await deleteMessageService(messageID);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'Message deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};