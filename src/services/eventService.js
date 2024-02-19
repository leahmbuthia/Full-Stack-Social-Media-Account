import { poolRequest } from "../utils/dbConnect.js";
import { sql } from "../utils/dbConnect.js";
export const createEventsServices = async (events) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, events.EventID)
            .input('EventName', sql.VarChar, events.EventName)
            .input('Description', sql.Text, events.Description)
            .input('EventDate', sql.DateTime, events.EventDate)
            .input('Location', sql.VarChar, events.Location)
            .input('EventPosterURL', sql.VarChar, events.EventPosterURL)
            .query("INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL) VALUES (@EventID, @EventName, @Description, @EventDate, @Location, @EventPosterURL);");
        return result;
    } catch (error) {
        return error;
    }
}

export const getEventsServices =async ()=>{
    try {
        const result =await poolRequest().query("SELECT * FROM Event");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
}
export const updateEventsService = async (events) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, events.EventID)
            .input('EventName', sql.VarChar, events.EventName)
            .input('Description', sql.Text, events.Description)
            .input('EventDate', sql.DateTime, events.EventDate)
            .input('Location', sql.VarChar, events.Location)
            .input('EventPosterURL', sql.VarChar, events.EventPosterURL)
            .query("UPDATE Event SET EventName = @EventName, Description = @Description, EventDate = @EventDate, Location = @Location, EventPosterURL = @EventPosterURL WHERE EventID = @EventID");

        console.log("Update result:", result);
        if (result.rowsAffected[0] === 0) {
            throw new Error("No rows were updated. EventID may not exist.");
        } 
        return result;
    } catch (error) {
        console.error("Error updating event:", error); // Log the error for debugging
        throw error;
    }
}

export const getEventByIdService = async (EventID) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .query("SELECT * FROM Event WHERE EventID =@EventID");

        // Check if any user is found
        if (result.recordset.length === 0) {
            throw new Error('Events not found');
        }

        // Return the first (and presumably only) user found
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}
export const deleteEventsService = async (EventID) => {
    try {
        const result = await poolRequest()
            .input('EventID', sql.VarChar, EventID)
            .query("DELETE FROM Event WHERE EventID = @EventID");

        if (result.rowsAffected[0] === 0) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
