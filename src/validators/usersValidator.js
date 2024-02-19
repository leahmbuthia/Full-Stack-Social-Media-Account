import joi from "joi";
 

export const usersValidator = (users)=>{
    const usersValidatorSchema = joi.object({
       Username : joi.string().required(),
       Email : joi.string().required(),
       Password : joi.string().required(),
       TagName : joi.string().required(),
       Location : joi.string().required(),

    });
    return usersValidatorSchema.validate(users);
}