import { Router } from 'express';
import { getGroups,createGroups,updateGroups,getGroupsById,deleteGroups } from "../controller/groupController.js";
const groupRouter = Router();

groupRouter.get('/groups', getGroups);
groupRouter.post('/groups', createGroups);
groupRouter.put('/groups/:GroupID', updateGroups);
groupRouter.get('/groups/:GroupID', getGroupsById);
groupRouter.delete('/groups/:GroupID', deleteGroups);



export default groupRouter;