import { Router } from 'express';
import { createCommentController, deleteCommentController, getAllCommentsController, updateCommentControllers } from '../controller/commentController.js';

const commentRouter = Router();

commentRouter.post('/comments', createCommentController);
commentRouter.get('/comments', getAllCommentsController);
commentRouter.put('/comments/:CommentID', updateCommentControllers);
commentRouter.delete('/comments/:CommentID', deleteCommentController);

export default commentRouter;