import joi from 'joi';

export const createCommentValidator = (comment) => {
    const createCommentValidatorSchema = joi.object({
        Content: joi.string().required(),
        // Add validation for other comment fields if needed
    });

    return createCommentValidatorSchema.validate(comment);
};

export const updateCommentValidator = (updatedComment) => {
    const updateCommentValidatorSchema = joi.object({
        Content: joi.string().required(),
        // Add validation for other comment fields if needed
    });

    return updateCommentValidatorSchema.validate(updatedComment);
};
