import joi from "joi";


export const usersValidator = (users)=>{
    const usersValidatorSchema = joi.object({
       Username : joi.string().required(),
       Email : joi.string().email().required(),
       Password : joi.string().required(),
       TagName : joi.string().required(),
       Location : joi.string().required(),

    });
    return usersValidatorSchema.validate(users);
}
export const userLoginValidator = (user) => {
    const userLoginValidatorSchema = joi.object({
        Email: joi.string().email().required(),
        Password: joi.string().min(4).required(),
    });
    return userLoginValidatorSchema.validate(user);
}


