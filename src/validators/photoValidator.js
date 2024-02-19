import joi from 'joi';

export const createPhotoValidator = (photo) => {
    const createPhotoValidatorSchema = joi.object({
        PhotoURL: joi.string().required()
    });

    return createPhotoValidatorSchema.validate(photo);
}

export const updatePhotoValidator = (updatedPhoto) => {
    const updatePhotoValidatorSchema = joi.object({
        PhotoURL: joi.string().required()
    });

    return updatePhotoValidatorSchema.validate(updatedPhoto);
}

export  const updatePhotoURLValidator=(updatedPhotoURL)=>{
    const updatePhotoURLValidatorSchema=joi.object({
        PhotoURL: joi.string().required()

    })

    return updatePhotoURLValidatorSchema.validate(updatedPhotoURL);
}

