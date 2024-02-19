import joi from 'joi';

export const createMessageValidator = (message) => {
    const createMessageValidatorSchema = joi.object({
        Content: joi.string().required(),
        SenderID: joi.string().required(),
        ReceiverID: joi.string().required(),
        MessageDate: joi.date().iso().required()
    });

    return createMessageValidatorSchema.validate(message);
};

export const updateMessageValidator = (updatedMessage) => {
    const updateMessageValidatorSchema = joi.object({
        Content: joi.string().required(),
        SenderID: joi.string().required(),
        ReceiverID: joi.string().required(),
        MessageDate: joi.date().iso().required()
    });

    return updateMessageValidatorSchema.validate(updatedMessage);
};
