
import joi from 'joi';

export  const createFriendshipValidator=(friendship)=>{
    const createFriendshipValidatorSchema=joi.object({
        User1ID: joi.string().required(),
        User2ID: joi.string().required()
    })

    return createFriendshipValidatorSchema.validate(friendship);
}



// export  const updatePostValidator=(updatedpost)=>{
//     const updatePostValidatorSchema=joi.object({
//         FriendshipDate: joi.string().required()

//     })

//     return updatePostValidatorSchema.validate(updatedpost);
// }
