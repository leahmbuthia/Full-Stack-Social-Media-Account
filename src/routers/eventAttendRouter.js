import { Router } from 'express';
import { getEventAttendees, createEventAttendees, updateEventAttendee, getEventAttendeeById, deleteEventAttendee } from "../controller/eventAttendController.js";

const eventAttendeesRouter = Router();

eventAttendeesRouter.post('/attendees', createEventAttendees);
eventAttendeesRouter.get('/attendees', getEventAttendees);
eventAttendeesRouter.put('/attendees/:AttendeeID', updateEventAttendee);
eventAttendeesRouter.get('/attendees/:AttendeeID', getEventAttendeeById);
eventAttendeesRouter.delete('/attendees/:AttendeeID', deleteEventAttendee);

export default eventAttendeesRouter;
