import {Router} from 'express';
import { createPostController, deletePostController, getAllPostsController, getSingleController, updateContentControllers, updatePostControllers } from '../controller/postController.js';
import { authMiddleware } from '../middleware/AuthUserMiddleware.js';

const postRouter=Router();

postRouter.post('/posts',authMiddleware,createPostController )

postRouter.get('/posts', getAllPostsController )

postRouter.get('/posts/single/:PostID', getSingleController)

postRouter.put('/posts/update/:PostID',authMiddleware,updatePostControllers)

postRouter.patch('/posts/patch/:PostID',authMiddleware,updateContentControllers)

postRouter.delete('/posts/delete/:PostID',authMiddleware, deletePostController)


export default postRouter;