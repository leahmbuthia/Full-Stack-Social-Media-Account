import joi from "joi";
 

export const eventValidator = (events)=>{
    const eventValidatorSchema = joi.object({
        EventName : joi.string().required(),
        Description : joi.string().required(),
        EventDate : joi.string().required(),
        Location : joi.string().required(),
        EventPosterURL : joi.string().required(),

    });
    return eventValidatorSchema.validate(events);
}