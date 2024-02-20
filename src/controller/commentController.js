import {v4} from 'uuid'
import { sendCreated, sendDeleteSuccess, sendSeverError} from "../helper/helperFunctions.js"
import { createCommentService, deleteCommentService, getAllCommentsService, getSingleCommentService, updateCommentService } from '../services/commentService.js';
import { createCommentValidator, updateCommentValidator } from '../validators/commentValidator.js';
import { sendServerError } from '../Comment/Helper/responseFunction.js';
import { updateFriendshipContentService } from '../services/friendService.js';


export const createCommentController = async (req, res) => {
    try {

      const {UserID,PostID,Content } = req.body;
      console.log(req.body);
     
      
      const CommentID = v4();
      const { error } = createCommentValidator({ Content });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const CommentDate = new Date();    
        const createdComment = { CommentID,UserID, PostID,Content,CommentDate};
  
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
 

  export const updateCommentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;

      const CommentDate = new Date();    
      const { error } = updateCommentValidator({Content });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedComment = await updateCommentService({ Content,CommentDate, CommentID });
      console.log('Updated one',updatedComment);
      if (updatedComment.error) {
        return sendServerError(res, updatedComment.error);
      }
  
      return sendCreated(res, 'Comment updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const updateContentControllers = async (req, res) => {
    try {
      const { Content } = req.body;
      const { CommentID } = req.params;

      const uploadContent= new Date();

      const { error } = updateCommentValidator({ Content});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedContent = await updateCommentService({ Content, CommentID, uploadContent });
      console.log('Updated one',updatedContent);
  
      if (updatedContent.error) {
        return sendServerError(res, updatedContent.error);
      }
  
      return sendCreated(res, 'comment updated successfully');
     
    } catch (error) {
      return sendServerError(res, 'Internal server error');
     
    }
  };
  

  export const getSingleCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const singleComment=await getSingleCommentService(CommentID)
      
      console.log('single',singleComment); 
      res.status(200).json({ comment: singleComment });

    } catch (error) {
      return error
    }
  }



  export const getAllCommentsController = async (req, res) => {
    try {
      const results = await getAllCommentsService()
        // const comments=results.recordset
        // console.log(comments);
      res.status(200).json({ results});
    } catch (error) {
      console.error("Error fetching all comments:", error);
      res.status(500).json("Internal server error");
    }
  };
//   try {
//     const photo= await getAllPhotosService();
//     res.status(200).json({ photo });
// } catch (error) {
//     console.error("Error fetching all posts:", error);
//     res.status(500).json("Internal server error");
// }
  

  export const deleteCommentController=async(req,res)=>{
    try {
      const {CommentID}=req.params
      const deletedComment=await deleteCommentService(CommentID)
      console.log('deleted comment',deletedComment); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
