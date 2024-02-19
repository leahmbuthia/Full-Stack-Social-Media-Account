import { Router } from 'express';
import { createFriendController, deleteFriendController, getAllFriendsController, getSingleFriendController, updateFriendController } from '../controller/friendController.js';

const friendRouter = Router();

friendRouter.post('/friends', createFriendController);

friendRouter.get('/friends', getAllFriendsController);

friendRouter.get('/friends/:FriendshipID', getSingleFriendController);

friendRouter.put('/friends/:FriendshipID', updateFriendController);

friendRouter.delete('/friends/:FriendshipID', deleteFriendController);

export default friendRouter;
