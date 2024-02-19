// import joi from "joi";
 

// export const postValidator = (posts)=>{
//     const postValidatorSchema = joi.object({
//        Username : joi.string().required(),
//        Email : joi.string().required(),
//        Password : joi.string().required(),
//        TagName : joi.string().required(),
//        Location : joi.string().required(),

//     });
//     return postValidatorSchema.validate(posts);
// }

import joi from 'joi';

export  const createPostValidator=(post)=>{
    const createPostValidatorSchema=joi.object({
        Content: joi.string().required()
    })

    return createPostValidatorSchema.validate(post);
}


     


export  const updatePostValidator=(updatedpost)=>{
    const updatePostValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updatePostValidatorSchema.validate(updatedpost);
}



export  const updateContentValidator=(updatedContent)=>{
    const updateContentValidatorSchema=joi.object({
        Content: joi.string().required()

    })

    return updateContentValidatorSchema.validate(updatedContent);
}
