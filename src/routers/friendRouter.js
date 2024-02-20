import { Router } from 'express';
import { createFriendshipController, deleteFriendshipController, getAllFriendshipsController, getSingleFriendshipController, updateFriendshipControllers } from '../controller/friendController.js';

const friendRouter = Router();

friendRouter.post('/friends', createFriendshipController);
friendRouter.get('/friends', getAllFriendshipsController);
friendRouter.get('/friends/:FriendshipID', getSingleFriendshipController);
friendRouter.put('/friends/:FriendshipID', updateFriendshipControllers);
friendRouter.delete('/friends/:FriendshipID', deleteFriendshipController);

export default friendRouter;
