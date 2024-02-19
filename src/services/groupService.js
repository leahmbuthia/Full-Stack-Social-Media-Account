import { poolRequest } from "../utils/dbConnect.js";
import { sql } from "../utils/dbConnect.js";
export const getGroupsServices =async ()=>{
    try {
        const result =await poolRequest().query("SELECT * FROM Tbl_Group");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
}

export const addGroupsService = async (group) => {
        try {
            const result = await poolRequest()
                .input('GroupID', sql.VarChar, group.GroupID)
                .input('GroupName', sql.VarChar, group.GroupName)
                .input('Description', sql.Text, group.Description)
                .input('CreatedDate', sql.DateTime, group.CreatedDate)
                .query("insert into Tbl_Group (GroupID,GroupName, Description,CreatedDate) values (@GroupID,@GroupName,@Description,@CreatedDate)");
            return result;
        } catch (error) {
            return error;
        }
    
}
export const getGroupByIdService = async (GroupID) => {
    try {
        const result = await poolRequest()
            .input('GroupID', sql.VarChar, GroupID)
            .query("SELECT * FROM Tbl_Group WHERE GroupID =@GroupID");

        // Check if any user is found
        if (result.recordset.length === 0) {
            throw new Error('User not found');
        }

        // Return the first (and presumably only) user found
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}
export const deleteGroupsService = async (GroupID) => {
    try {
        const result = await poolRequest()
            .input('GroupID', sql.VarChar, GroupID)
            .query("DELETE FROM Tbl_Group WHERE GroupID = @GroupID");

        if (result.rowsAffected[0] === 0) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
export const updateGroupsService= async(group)=>{
    try {
        const result = await poolRequest()
                .input('GroupID', sql.VarChar, group.GroupID)
                .input('GroupName', sql.VarChar, group.GroupName)
                .input('Description', sql.TEXT, group.Description)
                .input('CreatedDate', sql.VarChar, group.DATETIME)
                .query("UPDATE Tbl_Group SET GroupName=@GroupName, Description =@Description,CreatedDate=@CreatedDate WHERE GroupID = @GroupID");
            return result;
        } catch (error) {
            return error;
        }
        
} 

