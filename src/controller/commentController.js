import { v4 as uuidv4, v4 } from 'uuid';
import { sendCreated, sendDeleteSuccess, sendSeverError } from "../helper/helperFunctions.js";
import { createCommentService, getSingleCommentService,getAllCommentsService, deleteCommentService} from '../services/commentService.js'; // Import the comment service
import { createCommentValidator } from '../validators/commentValidator.js'; // Import the comment validator
import { sendServerError } from '../Comment/Helper/responseFunction.js';

export const createCommentController = async (req, res) => { // Change function name
    try {

        const {PostID,UserID,Content } = req.body;
        console.log(req.body);
       
        
        const CommentID = v4;
        const { error } = createCommentValidator({ Content });
        console.log("error",error);
        if (error) {
          return res.status(400).send(error.details[0].message);
        } else {
          const CommentDate = new Date();    
          const createdComment = { 
            CommentID,PostID,UserID,CommentDate,Content,};
    
          const result = await createCommentService(createdComment);
    
          if (result.message) {
            sendServerError(res, result.message)
        } else {
            sendCreated(res, 'comment created successfully');
        }
        }
      } catch (error) {
        sendServerError(res, error.message);
      }
};
export const updateCommentController = async (req, res) => { // Change function name
    try {
        const { Content } = req.body; // Adjusted input parameters for comments
        const { CommentID } = req.params; // Get the CommentID from params

        const CommentDate = new Date(); // Current date and time    
        const { error } = updateCommentValidator({ Content }); // Use comment validator
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedComment = await updateCommentService({ Content, CommentDate, CommentID }); // Call the comment service
        if (updatedComment.error) {
            return sendSeverError(res, updatedComment.error);
        }

        return sendCreated(res, 'Comment updated successfully'); // Adjusted success message
    } catch (error) {
        return sendSeverError(res, 'Internal server error');
    }
};
export const getSingleCommentController = async (req, res) => { // Change function name
    try {
        const { CommentID } = req.params; // Adjusted parameter to match comment ID
        const singleComment = await getSingleCommentService(CommentID); // Adjusted service function
        
        if (!singleComment) {
            return res.status(404).json({ error: 'Comment not found' }); // Adjusted error message
        }
        
        res.status(200).json({ comment: singleComment }); // Adjusted response object
    } catch (error) {
        sendSeverError(res, 'Internal server error'); // Adjusted error message
    }
};
export const getAllCommentsController = async (req, res) => { // Change function name
    try {
        const comments = await getAllCommentsService(); // Adjusted service function
        res.status(200).json({ comments }); // Adjusted response object
    } catch (error) {
        console.error("Error fetching all comments:", error); // Adjusted error message
        res.status(500).json("Internal server error");
    }
};
export const deleteCommentController = async (req, res) => { // Change function name
    try {
        const { CommentID } = req.params; // Adjusted parameter to CommentID
        const deletedComment = await deleteCommentService(CommentID); // Adjusted service function

        if (!deletedComment) { // Adjusted condition
            return res.status(404).json({ error: 'Comment not found' }); // Adjusted error message
        }

        sendDeleteSuccess(res, "Deleted successfully"); // Unchanged
    } catch (error) {
        sendSeverError(res, 'Internal server error'); // Unchanged
    }
};