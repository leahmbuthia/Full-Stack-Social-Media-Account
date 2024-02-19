import joi from 'joi';

export const createFriendValidator = (friend) => {
    const createFriendValidatorSchema = joi.object({
        User1ID: joi.string().required(),
        User2ID: joi.string().required(),
        FriendshipDate: joi.date().required()
    });

    return createFriendValidatorSchema.validate(friend);
};

export const updateFriendValidator = (updatedFriend) => {
    const updateFriendValidatorSchema = joi.object({
        User1ID: joi.string().required(),
        User2ID: joi.string().required(),
        FriendshipDate: joi.date().required()
    });

    return updateFriendValidatorSchema.validate(updatedFriend);
};
