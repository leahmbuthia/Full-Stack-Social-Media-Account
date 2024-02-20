import {v4} from 'uuid'
import { sendCreated, sendDeleteSuccess, sendSeverError} from "../helper/helperFunctions.js"
import { createGroupMemberService, deleteGroupMemberServices, getAllGroupMembersService, getSingleGroupMembersServices, updateGroupMemberService } from '../services/groupMemberService.js';
import { createGroupMembersValidator, updateGroupMembersValidator } from '../validators/groupMemberValidator.js';
import { sendServerError } from '../Comment/Helper/responseFunction.js';


export const createGroupMembersController = async (req, res) => {
    try {
      
      const {GroupID,MemberID } = req.body;
      console.log(req.body);

      const { error } = createGroupMembersValidator({ GroupID,MemberID  });
      console.log("error",error);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const createdGroupMembers = { GroupID,MemberID };
  
        const result = await createGroupMemberService(createdGroupMembers);
  
        if (result.message) {
          sendSeverError(res, result.message)
      } else {
          sendCreated(res, 'Groupmembers created successfully');
      }
      }
    } catch (error) {
      sendSeverError(res, error.message);
    }
  };


  export const updateGroupMemberControllers = async (req, res) => {
    try {
      const {GroupID,MemberID } = req.body;
      console.log(req.body)
      const { error } = updateGroupMembersValidator({GroupID,MemberID  });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const updatedGroup = await updateGroupMemberService({ GroupID,MemberID});
      console.log('Updated one',updatedGroup);
      if (updatedGroup.error) {
        return sendServerError(res, updatedGroup.error);
      }
  
      return sendCreated(res, 'Group updated successfully');
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
  };
  

  export const getSingleGroupMembersController=async(req,res)=>{
    try {
      const {GroupID}=req.params
      const singleGroupMembers=await getSingleGroupMembersServices(GroupID)
      
      console.log('single',singleGroupMembers); 
      res.status(200).json({ GroupMembers: singleGroupMembers });

    } catch (error) {
      return error
    }
  }



  export const getAllGroupMembersController = async (req, res) => {
    try {
      const results = await getAllGroupMembersService()
        const groupMembers=results.recordset
      res.status(200).json({ groupMembers: groupMembers });
    } catch (error) {
      console.error("Error fetching all group Members:", error);
      res.status(500).json("Internal server error");
    }
  };
  

  export const deleteGroupMembersControllers=async(req,res)=>{
    try {
      const {GroupID}=req.params
      const deletedGroupMembers=await deleteGroupMemberServices(GroupID)
      console.log('deleted GroupMembers',deletedGroupMembers); 
      sendDeleteSuccess(res,"Deleted successfully")
    } catch (error) {
      return error
    }
  }
