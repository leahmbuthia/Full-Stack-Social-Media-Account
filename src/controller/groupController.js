import { sql } from '../utils/dbConnect.js'
import { getGroupsServices ,addGroupsService, getGroupByIdService, deleteGroupsService, updateGroupsService} from "../services/groupService.js"
import { groupValidator } from "../validators/groupValidators.js"
import { sendNotFound, sendSeverError,checkIfValuesIsEmptyNullUndefined,sendCreated } from "../helper/helperFunctions.js";
import { v4 } from 'uuid';


export const getGroups = async (req, res) => {    
        try {
            const data = await getGroupsServices();
            if (data.length === 0) {
                sendNotFound(res, 'No Users found');
            } else {
                if (!req.query.page || !req.query.limit) {
                    if (req.query.order) {
                        res.status(200).json(orderData(data, req.query.order));
                    } else {
                        res.status(200).json(data);
                    }
                } else {
                    if (req.query.order) {
                        paginate(orderData(data, req.query.order), req, res);
                    } else {
                        paginate(data, req, res);
                    }
                }
            }
    
        } catch (error) {
            sendSeverError(res, error);
        }
    }
    export const createGroups = async (req, res) => {
        const { GroupName, Description, CreatedDate } = req.body;
        const { error } = groupValidator(req.body);
         const GroupID=v4();
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            
                const newGroup = {
                    GroupID,
                    GroupName,
                    Description,
                    CreatedDate,
                };
                    try {
                        let response = await addGroupsService(newGroup);
                        if (response.message) {
                            sendSeverError(res, response.message);
                        } else {
                            return res.status(201).json({ message: "Group created successfully", group: newGroup });
                        }
                    } catch (err) {
                        
                        return res.status(500).json({ error: "Internal server error" });
                    }
                }
            }
        
    
    
    export const getGroupsById = async (req, res) => {
        try {
            const GroupID = req.params.GroupID;
            const group = await getGroupByIdService(GroupID);
            
            if (group) {
                return res.status(200).json({ group });
            } else {
                return res.status(404).json({ error: 'group not found' });
            }
        } catch (error) {
            // Handle any unexpected errors
            return res.status(500).json({ error: error.message });
        }
    }

    export const updateGroups= async (req, res) => {
        try {
            const {GroupName, Description, CreatedDate}= req.body;
            const GroupID = req.params.GroupID;
            const groupToUpdate = await getGroupByIdService(GroupID);
            if (!groupToUpdate) {
                sendNotFound(res, 'Group not found');
            } else {
                if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
                    if (GroupName) {
                        groupToUpdate.GroupName = GroupName;
                    }
                    if (Description) {
                        groupToUpdate.Description = Description;
                    }
                    if (CreatedDate) {
                        groupToUpdate.CreatedDate = CreatedDate;
                    }
                    await updateGroupsService(groupToUpdate);
                    sendCreated(res, 'Group updated successfully');
                } else {
                    sendSeverError(res, 'Please provide acompleted field');
                }
            }
        } catch (error) {
            sendSeverError(res, error.message);
        }
    }
    export const deleteGroups = async (req, res) => {
        try {
           const GroupID = req.params.GroupID;
           const group = await deleteGroupsService(GroupID);
            if (group.rowsAffected[0] > 0) {
                return res.status(200).json({message: 'Group deleted successfully'})
            } else {
               return res.status(404).json({error: 'Group not found'})
            }
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
