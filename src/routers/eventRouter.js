import { Router } from 'express';
import { createEvents,getEvents,updateEvents,getEventsById,deleteEvents } from "../controller/eventController.js";
const eventRouter = Router();

eventRouter.get('/events', getEvents);
eventRouter.post('/events', createEvents);
eventRouter.put('/events/:EventID', updateEvents);
eventRouter.get('/events/:EventID', getEventsById);
eventRouter.delete('/events/:EventID', deleteEvents);



export default eventRouter;