import dotenv from 'dotenv';
import { poolRequest, sql } from '../utils/dbConnect.js';

dotenv.config();

export const createPostService = async (post) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, post.UserID)
            .input('PostID', sql.VarChar, post.PostID)
            .input('Content', sql.VarChar, post.Content)
            .input('PostDate', sql.DateTime, post.PostDate)
            .input('Likes', sql.Int, post.Likes)
            .input('Comments', sql.Int, post.Comments)
            .query('INSERT INTO post (PostID, UserID, Content, Likes, Comments, PostDate) VALUES (@PostID, @UserID, @Content, @Likes, @Comments, @PostDate)');

        console.log('Create Post Service Result:', result);
        return result;
    } catch (error) {
        console.error('Error in createPostService:', error);
        throw error;
    }
};

export const updatePostService = async (updatePost) => {
    try {
        const updatedPost = await poolRequest()
            .input('PostID', sql.VarChar, updatePost.PostID)
            .input('Content', sql.VarChar, updatePost.Content)
            .input('PostDate', sql.DateTime, updatePost.PostDate)
            .input('Likes', sql.Int, updatePost.Likes)
            .input('Comments', sql.Int, updatePost.Comments)
            .query(`UPDATE Post SET Content = @Content, PostDate = @PostDate, Likes = @Likes, Comments = @Comments WHERE PostID = @PostID`);

        console.log('Updated Post:', updatedPost);
        return updatedPost;
    } catch (error) {
        console.error('Error in updatePostService:', error);
        throw error;
    }
};

export const updateContentService = async (updateContent) => {
    try {
        const updatedContent = await poolRequest()
            .input('Content', sql.VarChar, updateContent.Content)
            .input('PostID', sql.VarChar, updateContent.PostID)
            .query(`UPDATE Post SET Content = @Content WHERE PostID = @PostID`);

        console.log('Updated Content:', updatedContent);
        return updatedContent;
    } catch (error) {
        console.error('Error in updateContentService:', error);
        throw error;
    }
};

export const getSinglePostServices = async (PostID) => {
    try {
        const singlePost = await poolRequest()
            .input('PostID', sql.VarChar, PostID)
            .query('SELECT * FROM Post WHERE PostID = @PostID');

        console.log('Single Post:', singlePost.recordset);
        return singlePost.recordset;
    } catch (error) {
        console.error('Error in getSinglePostServices:', error);
        throw error;
    }
};

export const getAllPostsService = async () => {
    try {
        const allPosts = await poolRequest().query('SELECT * FROM Post');

        console.log('All Posts:', allPosts.recordset);
        return allPosts.recordset;
    } catch (error) {
        console.error('Error in getAllPostsService:', error);
        throw error;
    }
};

export const deletePostServices = async (PostID) => {
    try {
        const deletedPost = await poolRequest()
            .input('PostID', sql.VarChar, PostID)
            .query('DELETE FROM Post WHERE PostID = @PostID');

        console.log('Deleted Post:', deletedPost.recordset);
        return deletedPost.recordset;
    } catch (error) {
        console.error('Error in deletePostServices:', error);
        throw error;
    }
};
