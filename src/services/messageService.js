import { sql } from "../utils/dbConnect.js";
import { poolRequest } from "../utils/dbConnect.js";

export const getMessagesService = async () => {
    try {
        const result = await poolRequest().query("SELECT * FROM Message");
        return result.recordset;
    } catch (error) {
        throw error;
    }
};

export const addMessageService = async (message) => {
    try {
        const result = await poolRequest()
            .input('MessageID', sql.VarChar, message.MessageID)
            .input('SenderID', sql.VarChar, message.SenderID)
            .input('ReceiverID', sql.VarChar, message.ReceiverID)
            .input('MessageDate', sql.DateTime, message.MessageDate)
            .input('Content', sql.VarChar, message.Content)
            .query("INSERT INTO Message (MessageID, SenderID, ReceiverID, MessageDate, Content) VALUES (@MessageID, @SenderID, @ReceiverID, @MessageDate, @Content)");
        return result;
    } catch (error) {
        throw error;
    }
};

export const updateMessageService = async (message) => {
    try {
        const result = await poolRequest()
            .input('MessageID', sql.VarChar, message.MessageID)
            .input('SenderID', sql.VarChar, message.SenderID)
            .input('ReceiverID', sql.VarChar, message.ReceiverID)
            .input('MessageDate', sql.DateTime, message.MessageDate)
            .input('Content', sql.VarChar, message.Content)
            .query("UPDATE Message SET SenderID = @SenderID, ReceiverID = @ReceiverID, MessageDate = @MessageDate, Content = @Content WHERE MessageID = @MessageID");
        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteMessageService = async (messageID) => {
    try {
        const result = await poolRequest()
            .input('MessageID', sql.VarChar, messageID)
            .query("DELETE FROM Message WHERE MessageID = @MessageID");

        if (result.rowsAffected[0] === 0) {
            throw new Error('Message not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
};

export const getMessageByIdService = async (messageID) => {
    try {
        const result = await poolRequest()
            .input('MessageID', sql.VarChar, messageID)
            .query("SELECT * FROM Message WHERE MessageID = @MessageID");

        if (result.recordset.length === 0) {
            throw new Error('Message not found');
        }

        return result.recordset[0];
    } catch (error) {
        throw error;
    }
};
