import { sql } from '../utils/dbConnect.js';
import { createEventAttendeesService, getEventAttendeesServices } from "../services/eventAttendService.js";
import { sendNotFound, sendSeverError, paginate, orderData, checkIfValuesIsEmptyNullUndefined, sendCreated } from "../helper/helperFunctions.js";
import {  deleteEventAttendeeService, getEventAttendeeByIdService, updateEventAttendeesService } from '../services/eventAttendService.js';
import { eventAttendeesValidator } from '../validators/eventAttendValidator.js';


export const getEventAttendees = async (req, res) => {
    try {
        const results = await getEventAttendeesServices()
          const eventAttendee=results.recordset
        res.status(200).json({ eventAttendee: eventAttendee });
      } catch (error) {
        console.error("Error fetching all group Members:", error);
        res.status(500).json("Internal server error");
      }
    };
export const createEventAttendees = async (req, res) => {
        try {
            const {EventID,AttendeeID } = req.body;
            console.log(req.body);
            const{error} = eventAttendeesValidator({ EventID,AttendeeID});
            console.log("error",error);
            if (error){
                return res.status(400).send(error.details[0].message);
            }else{
                const createdEventAttendees = {EventID, AttendeeID};
                const result =await createEventAttendeesService(createdEventAttendees);
                if (result.message){
                    sendSeverError(res, result.message)
                }else{
                    sendCreated(res,'EventAttendee created successfully');
                }
            }
            let response = await createEventAttendeesService(newEventAttendee); // Update to use the service function for event attendees
            if (response.message) {
                sendSeverError(res, response.message);
            } else {
                return res.status(201).json({ message: "Event attendee created successfully", eventAttendee: newEventAttendee });
            }
        } catch (err) {
            console.error("Error creating event attendee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    
};
export const getEventAttendeeById = async (req, res) => {
    try {
        const EventAttendeeID = req.params.EventAttendeeID;
        const eventAttendee = await getEventAttendeeByIdService(EventAttendeeID);

        if (eventAttendee) {
            return res.status(200).json({ eventAttendee });
        } else {
            return res.status(404).json({ error: 'EventAttendee not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateEventAttendee = async (req, res) => {
    try {
        const { EventID, AttendeeID } = req.body;
        const EventAttendeeID = req.params.EventAttendeeID;
        const eventAttendeeToUpdate = await getEventAttendeeByIdService(EventAttendeeID);

        if (!eventAttendeeToUpdate) {
            return sendNotFound(res, 'EventAttendee not found');
        } else {
            if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
                if (EventID) {
                    eventAttendeeToUpdate.EventID = EventID;
                }
                if (AttendeeID) {
                    eventAttendeeToUpdate.AttendeeID = AttendeeID;
                }
                await updateEventAttendeesService(eventAttendeeToUpdate);
                return sendCreated(res, 'EventAttendee updated successfully');
            } else {
                return sendServerError(res, 'Please provide a completed field');
            }
        }
    } catch (error) {
        return sendSeverError(res, error.message);
    }
};

export const deleteEventAttendee = async (req, res) => {
    try {
        const EventAttendeeID = req.params.EventAttendeeID;
        const result = await deleteEventAttendeeService(EventAttendeeID);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: 'EventAttendee deleted successfully' });
        } else {
            return res.status(404).json({ error: 'EventAttendee not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


