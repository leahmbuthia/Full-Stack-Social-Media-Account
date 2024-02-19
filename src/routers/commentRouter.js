import { Router } from 'express';
import { createCommentController, deleteCommentController, getAllCommentsController, updateCommentController } from '../controller/commentController.js';

const commentRouter = Router();

commentRouter.post('/comments', createCommentController);
commentRouter.get('/comments', getAllCommentsController);
commentRouter.put('/comments/:CommentID', updateCommentController);
commentRouter.delete('/commentsdelete/:CommentID', deleteCommentController);

export default commentRouter;