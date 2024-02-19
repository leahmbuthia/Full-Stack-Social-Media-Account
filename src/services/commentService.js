import dotenv from 'dotenv';
import { poolRequest, sql } from '../utils/dbConnect.js';

dotenv.config();

export const createCommentService = async (comment) => {
    try {
        const result=await poolRequest()
        .input('CommentID', sql.VarChar,comment.CommentID )
        .input('UserID', sql.VarChar,comment.UserID )
        .input('PostID', sql.VarChar,comment.PostID )
        .input('Content', sql.VarChar,comment.Content)
        .input('CommentDate', sql.DateTime,comment.CommentDate)
        .query('INSERT INTO Comment (CommentID,UserID,PostID,Content,CommentDate) VALUES(@CommentID,@UserID,@PostID,@Content,@CommentDate)')
        console.log('results',result);
        return result;
    
      } catch (error) {
        return error
      }
};

export const updateCommentService = async (updateComment) => {
    try {
        const updatedComment = await poolRequest()
            .input('CommentID', sql.VarChar, updateComment.CommentID)
            .input('Content', sql.VarChar, updateComment.Content)
            .query(`UPDATE Comment SET Content = @Content WHERE CommentID = @CommentID`);

        console.log('Updated Comment:', updatedComment);
        return updatedComment;
    } catch (error) {
        console.error('Error in updateCommentService:', error);
        throw error;
    }
};

export const getSingleCommentService = async (CommentID) => {
    try {
        const singleComment = await poolRequest()
            .input('CommentID', sql.VarChar, CommentID)
            .query('SELECT * FROM Comment WHERE CommentID = @CommentID');

        console.log('Single Comment:', singleComment.recordset);
        return singleComment.recordset;
    } catch (error) {
        console.error('Error in getSingleCommentService:', error);
        throw error;
    }
};

export const getAllCommentsService = async () => {
    try {
        const allComments = await poolRequest().query('SELECT * FROM Comment');

        console.log('All Comments:', allComments.recordset);
        return allComments.recordset;
    } catch (error) {
        console.error('Error in getAllCommentsService:', error);
        throw error;
    }
};

export const deleteCommentService = async (CommentID) => {
    try {
        const deletedComment = await poolRequest()
            .input('CommentID', sql.VarChar, CommentID)
            .query('DELETE FROM Comment WHERE CommentID = @CommentID');

        console.log('Deleted Comment:', deletedComment.recordset);
        return deletedComment.recordset;
    } catch (error) {
        console.error('Error in deleteCommentService:', error);
        throw error;
    }
};
