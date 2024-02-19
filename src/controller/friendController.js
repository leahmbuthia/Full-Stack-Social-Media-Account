import { v4 as uuidv4 } from 'uuid';
import { sendCreated, sendDeleteSuccess, sendSeverError } from "../helper/helperFunctions.js";
import { createFriendshipService,deleteFriendshipService,getAllFriendshipsService,getSingleFriendshipService,updateFriendshipService } from '../services/friendService.js'; // Assuming you have a service for creating friendships
import { createFriendValidator, updateFriendValidator } from '../validators/friendValidator.js'; // Assuming you have a validator for creating friendships

export const createFriendController = async (req, res) => {
    try {
        const { User1ID, User2ID } = req.body;
        const FriendshipID = uuidv4();
        const FriendshipDate = new Date();
        
        const { error } = createFriendValidator({ User1ID, User2ID });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const newFriendship = { FriendshipID, User1ID, User2ID, FriendshipDate };

        const result = await createFriendshipService(newFriendship);

        if (result.message) {
            sendSeverError(res, result.message);
        } else {
            sendCreated(res, 'Friendship created successfully');
        }
    } catch (error) {
        sendSeverError(res, error.message);
    }
};
export const updateFriendController = async (req, res) => {
    try {
        const { User1ID, User2ID } = req.body;
        const { FriendshipID } = req.params;

        const FriendshipDate = new Date();    
        const { error } = updateFriendValidator({ User1ID, User2ID });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedFriendship = await updateFriendshipService({ User1ID, User2ID, FriendshipDate, FriendshipID });
        if (updatedFriendship.error) {
            return sendSeverError(res, updatedFriendship.error);
        }

        return sendCreated(res, 'Friendship updated successfully');
    } catch (error) {
        return sendSeverError(res, 'Internal server error');
    }
};
export const updateFriendshipController = async (req, res) => {
    try {
        const { User1ID, User2ID } = req.body;
        const { FriendshipID } = req.params;

        const FriendshipDate = new Date();    
        const { error } = updateFriendValidator({ User1ID, User2ID });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedFriendship = await updateFriendshipService({ User1ID, User2ID, FriendshipDate, FriendshipID });
        if (updatedFriendship.error) {
            return sendSeverError(res, updatedFriendship.error);
        }

        return sendCreated(res, 'Friendship updated successfully');
    } catch (error) {
        return sendSeverError(res, 'Internal server error');
    }
};
export const getSingleFriendController = async (req, res) => {
    try {
        const { FriendshipID } = req.params;
        const singleFriend = await getSingleFriendshipService(FriendshipID);
        
        if (!singleFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        
        res.status(200).json({ friend: singleFriend });
    } catch (error) {
        sendSeverError(res, 'Internal server error');
    }
};

export const getAllFriendsController = async (req, res) => {
    try {
        const friends = await getAllFriendshipsService();
        res.status(200).json({ friends });
    } catch (error) {
        console.error("Error fetching all friends:", error);
        res.status(500).json("Internal server error");
    }
};

export const deleteFriendController = async (req, res) => {
    try {
        const { FriendshipID } = req.params;
        const deletedFriend = await deleteFriendshipService(FriendshipID);
        
        if (!deletedFriend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        
        sendDeleteSuccess(res, "Deleted successfully");
    } catch (error) {
        sendSeverError(res, 'Internal server error');
    }
};
