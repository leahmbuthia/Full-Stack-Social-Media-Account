import joi from "joi";

export const eventAttendeesValidator = (eventAttendee) => {
    const eventAttendeesValidatorSchema = joi.object({
        EventID: joi.string().required(),
        AttendeeID: joi.string().required()
    });

    return eventAttendeesValidatorSchema.validate(eventAttendee);
};
