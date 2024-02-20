import dotenv from 'dotenv';
import { poolRequest, sql } from '../utils/dbConnect.js';

dotenv.config();

export const createFriendshipService = async (friendship) => {
    try {
        const result = await poolRequest()
            .input('FriendshipID', sql.VarChar, friendship.FriendshipID)
            .input('User1ID', sql.VarChar, friendship.User1ID)
            .input('User2ID', sql.VarChar, friendship.User2ID)
            .input('FriendshipDate', sql.DateTime, friendship.FriendshipDate)
            .query('INSERT INTO Friendship (FriendshipID, User1ID, User2ID, FriendshipDate) VALUES (@FriendshipID, @User1ID, @User2ID, @FriendshipDate)');

        console.log('Create Friendship Service Result:', result);
        return result;
    } catch (error) {
        console.error('Error in createFriendshipService:', error);
        throw error;
    }
};

export const deleteFriendshipService = async (FriendshipID) => {
    try {
        const deletedFriendship = await poolRequest()
            .input('FriendshipID', sql.VarChar, FriendshipID)
            .query('DELETE FROM Friendship WHERE FriendshipID = @FriendshipID');

        console.log('Deleted Friendship:', deletedFriendship.recordset);
        return deletedFriendship.recordset;
    } catch (error) {
        console.error('Error in deleteFriendshipService:', error);
        throw error;
    }
};

export const getFriendshipService = async (FriendshipID) => {
    try {
        const friendship = await poolRequest()
            .input('FriendshipID', sql.VarChar, FriendshipID)
            .query('SELECT * FROM Friendship WHERE FriendshipID = @FriendshipID');

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
            .input('FriendshipID', sql.VarChar, updatedFriendship.FriendshipID)
            .input('User1ID', sql.VarChar, updatedFriendship.User1ID)
            .input('User2ID', sql.VarChar, updatedFriendship.User2ID)
            // .input('FriendshipDate', sql.DateTime, updatedFriendship.FriendshipDate)
            .query(`UPDATE Friendship SET User1ID = @User1ID, User2ID = @User2ID WHERE FriendshipID = @FriendshipID`);

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
            .input('FriendshipID', sql.VarChar, updatedFriendshipContent.FriendshipID)
            .query(`UPDATE Friendship SET Content = @Content WHERE FriendshipID = @FriendshipID`);

        console.log('Updated Friendship Content:', updatedContentResult);
        return updatedContentResult;
    } catch (error) {
        console.error('Error in updateFriendshipContentService:', error);
        throw error;
    }
};
export const getSingleFriendshipService = async (FriendshipID) => {
    try {
        const singleFriendship = await poolRequest()
            .input('FriendshipID', sql.VarChar, FriendshipID)
            .query('SELECT * FROM Friendship WHERE FriendshipID = @FriendshipID');

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
export const checkExistingFriendshipService= async (User2ID)=>{
    try {
        const singleFriendship = await poolRequest()
        .input('User2ID', sql.VarChar, User2ID)
        .query('SELECT * FROM Friendship WHERE User2ID = @User2ID');

    console.log('Single Friendship:', singleFriendship.recordset);
    return singleFriendship;
} catch (error) {
    console.error('Error in getSingleFriendshipService:', error);
    throw error;
}
}


// You might need other operations such as updating friendship details, fetching all friendships of a user, etc.
