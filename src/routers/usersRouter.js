import { Router } from 'express';
import { getUsers,createUsers,updateUsers,getUserById,deleteUsers, loginUser} from "../controller/usersController.js";
import { authMiddleware } from '../middleware/AuthUserMiddleware.js';
const usersRouter = Router();


usersRouter.post("/users/auth/login", loginUser);
usersRouter.get('/users', getUsers);
usersRouter.post('/users',createUsers);
usersRouter.put('/users/:UserID',authMiddleware, updateUsers);
usersRouter.get('/users/:UserID',authMiddleware, getUserById);
usersRouter.delete('/users/:UserID', authMiddleware,deleteUsers);



export default usersRouter;