import { v4 as uuidv4 } from 'uuid';
import { sendCreated, sendDeleteSuccess, sendSeverError } from "../helper/helperFunctions.js";
import { createPostService, deletePostServices, getAllPostsService, getSinglePostServices, updateContentService, updatePostService } from '../services/postService.js';
import { createPostValidator, updateContentValidator, updatePostValidator } from '../validators/postValidator.js';

export const createPostController = async (req, res) => {
    try {
        const { UserID, Content, Likes, Comments } = req.body;
        const PostID = uuidv4();
        
        const { error } = createPostValidator({ Content });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const PostDate = new Date();    
        const createdPost = { UserID, PostID, Content, PostDate, Likes, Comments };

        const result = await createPostService(createdPost);

        if (result.message) {
            sendSeverError(res, result.message);
        } else {
            sendCreated(res, 'Post created successfully');
        }
    } catch (error) {
        sendSeverError(res, error.message);
    }
};

export const updatePostControllers = async (req, res) => {
    try {
        const { Content, Likes, Comments } = req.body;
        const { PostID } = req.params;

        const PostDate = new Date();    
        const { error } = updatePostValidator({ Content });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedPost = await updatePostService({ Content, PostDate, Likes, Comments, PostID });
        if (updatedPost.error) {
            return sendSeverError(res, updatedPost.error);
        }

        return sendCreated(res, 'Post updated successfully');
    } catch (error) {
        return sendSeverError(res, 'Internal server error');
    }
};

export const updateContentControllers = async (req, res) => {
    try {
        const { Content } = req.body;
        const { PostID } = req.params;

        const { error } = updateContentValidator({ Content });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedContent = await updateContentService({ Content, PostID });
        if (updatedContent.error) {
            return sendSeverError(res, updatedContent.error);
        }

        return sendCreated(res, 'Post updated successfully');
    } catch (error) {
        return sendSeverError(res, 'Internal server error');
    }
};

export const getSingleController = async (req, res) => {
    try {
        const { PostID } = req.params;
        const singlePost = await getSinglePostServices(PostID);
        
        if (!singlePost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.status(200).json({ post: singlePost });
    } catch (error) {
        sendSeverError(res, 'Internal server error');
    }
};

export const getAllPostsController = async (req, res) => {
    try {
        const posts = await getAllPostsService();
        res.status(200).json({ posts });
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json("Internal server error");
    }
};

export const deletePostController = async (req, res) => {
    try {
        const { PostID } = req.params;
        const deletedPost = await deletePostServices(PostID);
        
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        sendDeleteSuccess(res, "Deleted successfully");
    } catch (error) {
        sendSeverError(res, 'Internal server error');
    }
};
