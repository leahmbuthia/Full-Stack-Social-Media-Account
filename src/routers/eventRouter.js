import { Router } from 'express';
import { createEvents,getEvents,updateEvents,getEventsById,deleteEvents } from "../controller/eventController.js";
import { authMiddleware } from '../middleware/AuthUserMiddleware.js';
const eventRouter = Router();

eventRouter.get('/events', getEvents);
eventRouter.post('/events',authMiddleware, createEvents);
eventRouter.put('/events/:EventID',authMiddleware, updateEvents);
eventRouter.get('/events/:EventID', getEventsById);
eventRouter.delete('/events/:EventID',authMiddleware, deleteEvents);



export default eventRouter;