import { Router } from 'express';
import { getUsers,createUsers,updateUsers,getUserById,deleteUsers, loginUser} from "../controller/usersController.js";
const usersRouter = Router();


usersRouter.post("/users/auth/login", loginUser);
usersRouter.get('/users', getUsers);
usersRouter.post('/users', createUsers);
usersRouter.put('/users/:UserID', updateUsers);
usersRouter.get('/users/:UserID', getUserById);
usersRouter.delete('/users/:UserID', deleteUsers);



export default usersRouter;