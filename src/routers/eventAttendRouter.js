import { Router } from 'express';
import { getEventAttendees, createEventAttendees, updateEventAttendee, getEventAttendeeById, deleteEventAttendee } from "../controller/eventAttendController.js";

const eventAttendeesRouter = Router();

eventAttendeesRouter.get('/eventAttendees', getEventAttendees);
eventAttendeesRouter.post('/eventAttendees', createEventAttendees);
eventAttendeesRouter.put('/eventAttendees/:EventAttendeeID', updateEventAttendee);
eventAttendeesRouter.get('/eventAttendees/:EventAttendeeID', getEventAttendeeById);
eventAttendeesRouter.delete('/eventAttendees/:EventAttendeeID', deleteEventAttendee);

export default eventAttendeesRouter;
