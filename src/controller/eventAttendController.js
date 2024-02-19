import { sql } from '../utils/dbConnect.js';
import { getEventAttendeesServices } from "../services/eventAttendService.js";
import { sendNotFound, sendSeverError, paginate, orderData, checkIfValuesIsEmptyNullUndefined, sendCreated } from "../helper/helperFunctions.js";
import { addEventAttendeesService, deleteEventAttendeeService, getEventAttendeeByIdService, updateEventAttendeesService } from '../services/eventAttendService.js';
import { sendServerError } from '../Comment/Helper/responseFunction.js';

export const getEventAttendees = async (req, res) => {
    try {
        const data = await getEventAttendeesServices(); // Update to use event attendees service
        if (data.length === 0) {
            sendNotFound(res, 'No EventAttendees found');
        } else {
            if (!req.query.page || !req.query.limit) {
                if (req.query.order) {
                    res.status(200).json(orderData(data, req.query.order));
                } else {
                    res.status(200).json(data);
                }
            } else {
                if (req.query.order) {
                    paginate(orderData(data, req.query.order), req, res);
                } else {
                    paginate(data, req, res);
                }
            }
        }
    } catch (error) {
        sendSeverError(res, error);
    }
};
export const createEventAttendees = async (req, res) => {
    const { EventID, AttendeeID } = req.body;
    
    // Validate input parameters (if needed)
    
    const { error } = eventAttendeesValidator(req.body); // Assuming you have a validator for event attendees
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        const newEventAttendee = {
            EventID,
            AttendeeID,
        };

        try {
            let response = await addEventAttendeesService(newEventAttendee); // Update to use the service function for event attendees
            if (response.message) {
                sendSeverError(res, response.message);
            } else {
                return res.status(201).json({ message: "Event attendee created successfully", eventAttendee: newEventAttendee });
            }
        } catch (err) {
            console.error("Error creating event attendee:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
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


