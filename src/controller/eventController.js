import { v4 } from "uuid";
import { createEventsServices, deleteEventsService, getEventsServices, updateEventsService ,getEventByIdService} from "../services/eventService.js";
import { checkIfValuesIsEmptyNullUndefined, sendCreated, sendSeverError } from "../helper/helperFunctions.js";
import { eventValidator } from "../validators/eventValidator.js";
import { addUsersService } from "../services/usersServices.js";

export const createEvents = async (req, res) => {
    const { EventName, Description, EventDate, Location, EventPosterURL } = req.body;
    const { error } = eventValidator(req.body);
    const EventID = v4();

    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        const newEvent = {
            EventID,
            EventName,
            Description,
            EventDate,
            Location,
            EventPosterURL,
        };

        try {
            const response = await createEventsServices(newEvent);
            if (response.message) {
                return res.status(500).json({ error: response.message });
            } else {
                return res.status(201).json({ message: "Event created successfully", event: newEvent });
            }
        } catch (err) {
            console.error("Error creating event:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
export const getEvents = async (req, res) => { //localhost:3000/todos?page=1&limit=10    
    try {
        const data = await getEventsServices();
        if (data.length === 0) {
            sendNotFound(res, 'No Events found');
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
}
export const getEventsById = async (req, res) => {
    try {
        const EventID = req.params.EventID;
        const event = await getEventByIdService(EventID);
        
        if (event) {
            return res.status(200).json({ event });
        } else {
            return res.status(404).json({ error: 'Events not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
export const updateEvents= async (req, res) => {
    // console.log('Received request. Res:', res);
    try {
    const { EventName, Description, EventDate, Location, EventPosterURL } = req.body;
    const EventID = req.params.EventID;
    const EventToUpdate = await getEventByIdService(EventID);;
        if (!EventToUpdate) {
             sendNotFound(res, 'Event not found');
        } else {
            if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
                if (EventName) {
                    EventToUpdate.EventName = EventName;
                }
                if (Description) {
                    EventToUpdate.Description = Description;
                }
                if (EventDate) {
                    EventToUpdate.EventDate = EventDate;
                }
                if (Location) {
                    EventToUpdate.Location = Location;
                }
                if (EventPosterURL) {
                    EventToUpdate.EventPosterURL = EventPosterURL;
                }
                await updateEventsService(EventToUpdate);
                return sendCreated(res, 'Event updated successfully');
            } else {
                sendSeverError(res, 'Please provide a completed field');
            }
        }
    } catch (error) {
        sendSeverError(res, error.message); // Fixed typo: sendSeverError -> sendServerError
    }
    
}

export const deleteEvents = async (req, res) => {
    try {
        const EventID = req.params.EventID;
        const result = await deleteEventsService(EventID);

        // Check if any rows are affected (user deleted)
        if (result.rowsAffected[0] > 0) {
            // Return a success message or any relevant data
            return res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            // If no user is deleted, return an error
            return res.status(404).json({ error: 'Event not found' });
        }
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({ error: error.message });
    }
}

