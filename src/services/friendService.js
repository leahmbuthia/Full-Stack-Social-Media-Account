import dotenv from 'dotenv';
import { poolRequest, sql } from '../utils/dbConnect.js';

dotenv.config();

export const createFriendshipService = async (friendship) => {
    try {
        const result = await poolRequest()
            .input('FriendShipID', sql.VarChar, friendship.FriendShipID)
            .input('User1ID', sql.VarChar, friendship.User1ID)
            .input('User2ID', sql.VarChar, friendship.User2ID)
            .input('FriendShipDate', sql.DateTime, friendship.FriendShipDate)
            .query('INSERT INTO Friendship (FriendShipID, User1ID, User2ID, FriendShipDate) VALUES (@FriendShipID, @User1ID, @User2ID, @FriendShipDate)');

        console.log('Create Friendship Service Result:', result);
        return result;
    } catch (error) {
        console.error('Error in createFriendshipService:', error);
        throw error;
    }
};

export const deleteFriendshipService = async (FriendShipID) => {
    try {
        const deletedFriendship = await poolRequest()
            .input('FriendShipID', sql.VarChar, FriendShipID)
            .query('DELETE FROM Friendship WHERE FriendShipID = @FriendShipID');

        console.log('Deleted Friendship:', deletedFriendship.recordset);
        return deletedFriendship.recordset;
    } catch (error) {
        console.error('Error in deleteFriendshipService:', error);
        throw error;
    }
};

export const getFriendshipService = async (FriendShipID) => {
    try {
        const friendship = await poolRequest()
            .input('FriendShipID', sql.VarChar, FriendShipID)
            .query('SELECT * FROM Friendship WHERE FriendShipID = @FriendShipID');

        console.log('Friendship:', friendship.recordset);
        return friendship.recordset;
    } catch (error) {
        console.error('Error in getFriendshipService:', error);
        throw error;
    }
};
export const updateFriendshipService = async (updatedFriendship) => {
    try {
        const updatedFriendshipResult = await poolRequest()
            .input('FriendShipID', sql.VarChar, updatedFriendship.FriendShipID)
            .input('User1ID', sql.VarChar, updatedFriendship.User1ID)
            .input('User2ID', sql.VarChar, updatedFriendship.User2ID)
            // .input('FriendShipDate', sql.DateTime, updatedFriendship.FriendShipDate)
            .query(`UPDATE Friendship SET User1ID = @User1ID, User2ID = @User2ID WHERE FriendShipID = @FriendShipID`);

        console.log('Updated Friendship:', updatedFriendshipResult);
        return updatedFriendshipResult;
    } catch (error) {
        console.error('Error in updateFriendshipService:', error);
        throw error;
    }
};

export const updateFriendshipContentService = async (updatedFriendshipContent) => {
    try {
        const updatedContentResult = await poolRequest()
            .input('Content', sql.VarChar, updatedFriendshipContent.Content)
            .input('FriendShipID', sql.VarChar, updatedFriendshipContent.FriendShipID)
            .query(`UPDATE Friendship SET Content = @Content WHERE FriendShipID = @FriendShipID`);

        console.log('Updated Friendship Content:', updatedContentResult);
        return updatedContentResult;
    } catch (error) {
        console.error('Error in updateFriendshipContentService:', error);
        throw error;
    }
};
export const getSingleFriendshipService = async (FriendShipID) => {
    try {
        const singleFriendship = await poolRequest()
            .input('FriendShipID', sql.VarChar, FriendShipID)
            .query('SELECT * FROM Friendship WHERE FriendShipID = @FriendShipID');

        console.log('Single Friendship:', singleFriendship.recordset);
        return singleFriendship.recordset;
    } catch (error) {
        console.error('Error in getSingleFriendshipService:', error);
        throw error;
    }
};

export const getAllFriendshipsService = async () => {
    try {
        const allFriendships = await poolRequest().query('SELECT * FROM Friendship');

        console.log('All Friendships:', allFriendships.recordset);
        return allFriendships.recordset;
    } catch (error) {
        console.error('Error in getAllFriendshipsService:', error);
        throw error;
    }
};


// You might need other operations such as updating friendship details, fetching all friendships of a user, etc.
