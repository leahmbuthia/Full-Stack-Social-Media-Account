import {Router} from 'express';
import { createPostController, deletePostController, getAllPostsController, getSingleController, updateContentControllers, updatePostControllers } from '../controller/postController.js';

const postRouter=Router();

postRouter.post('/posts',createPostController )

postRouter.get('/posts', getAllPostsController )

postRouter.get('/posts/single/:PostID', getSingleController)

postRouter.put('/posts/update/:PostID',updatePostControllers)

postRouter.patch('/posts/patch/:PostID',updateContentControllers)

postRouter.delete('/posts/delete/:PostID', deletePostController)


export default postRouter;