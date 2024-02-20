
import joi from 'joi';

export  const createGroupMembersValidator=(groupmembers)=>{
    const createGroupMembersValidatorSchema=joi.object({
        GroupID: joi.string().required(),
        MemberID: joi.string().required()
    })

    return createGroupMembersValidatorSchema.validate(groupmembers);
}
export  const updateGroupMembersValidator=(groupmembers)=>{
    const createGroupMembersValidatorSchema=joi.object({
        GroupID: joi.string().required(),
        MemberID: joi.string().required()
    })

    return createGroupMembersValidatorSchema.validate(groupmembers);
}