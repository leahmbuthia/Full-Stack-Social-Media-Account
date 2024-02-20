import { Router } from 'express';
import { getEventAttendees, createEventAttendees, updateEventAttendee, getEventAttendeeById, deleteEventAttendee } from "../controller/eventAttendController.js";

const eventAttendeesRouter = Router();

eventAttendeesRouter.get('/eventAttendees', getEventAttendees);
eventAttendeesRouter.post('/eventAttendees', createEventAttendees);
eventAttendeesRouter.put('/eventAttendees/:AttendeeID', updateEventAttendee);
eventAttendeesRouter.get('/eventAttendees/:AttendeeID', getEventAttendeeById);
eventAttendeesRouter.delete('/eventAttendees/:AttendeeID', deleteEventAttendee);

export default eventAttendeesRouter;
