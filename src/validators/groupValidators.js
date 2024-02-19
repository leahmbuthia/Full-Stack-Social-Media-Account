import joi from "joi";
 

export const groupValidator = (groups)=>{
    const groupValidatorSchema = joi.object({
        GroupName : joi.string().required(),
        Description : joi.string().required(),
        CreatedDate : joi.string().required(),

    });
    return groupValidatorSchema.validate(groups);
}