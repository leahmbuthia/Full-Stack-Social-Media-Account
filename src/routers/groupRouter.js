import { Router } from 'express';
import { getGroups,createGroups,updateGroups,getGroupsById,deleteGroups } from "../controller/groupController.js";
import { authMiddleware } from '../middleware/AuthUserMiddleware.js';
const groupRouter = Router();

groupRouter.get('/groups', getGroups);
groupRouter.post('/groups',authMiddleware, createGroups);
groupRouter.put('/groups/:GroupID',authMiddleware, updateGroups);
groupRouter.get('/groups/:GroupID', getGroupsById);
groupRouter.delete('/groups/:GroupID',authMiddleware, deleteGroups);



export default groupRouter;