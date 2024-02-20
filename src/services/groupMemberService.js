
import dotenv from 'dotenv'

import {poolRequest,sql} from '../utils/dbConnect.js'

dotenv.config();

// Register post service
export const createGroupMemberService = async (groupmembers) => {
  try {
    const query = 'INSERT INTO GroupMembers (GroupID, MemberID) VALUES (@GroupID, @MemberID)';
    const result = await poolRequest()
      .input('GroupID', sql.VarChar, groupmembers.GroupID)
      .input('MemberID', sql.VarChar, groupmembers.MemberID)
      .query(query);

    console.log('results', result);
    return result;
  } catch (error) {
    return error;
  }
};
export const getAllGroupMembersService=async()=>{
      try {
            const allGroupMembers=await poolRequest()
            .query(`SELECT * FROM GroupMembers`)
            return allGroupMembers
        } catch (error) {
            return error
        }

}

export const getSingleGroupMembersServices=async(MemberID)=>{
    try{
        const result =await poolRequest()
        .input('MemberID',sql.VarChar,MemberID)
        .query(`
                SELECT GroupMembers.*, Tbl_User.Username, Tbl_User.Tagname, Tbl_User.UserID FROM GroupMembers 
                INNER JOIN Tbl_User ON Tbl_User.UserID=GroupMembers.MemberID
                WHERE GroupMembers.MemberID=@MemberID
        `)

        return result.recordset

    }
    catch(error){
          return error
    }
}

export const deleteGroupMemberServices=async(MemberID,GroupID)=>{
    try{
        const result =await poolRequest()
        .input('MemberID',sql.VarChar,MemberID)
        .input('GroupID',sql.VarChar,GroupID)
        .query(`
               DELETE FROM GroupMembers WHERE MemberID=@MemberID AND GroupID=@GroupID
        `)

        return result

    }
    catch(error){
          return error
    }

}


export const updateGroupMemberService=async(updateGroupmembers)=>{
  try {
    const updatedGroup=await poolRequest()
    .input('GroupID', sql.VarChar, updateGroupmembers.GroupID)
    .input('MemberID', sql.VarChar, updateGroupmembers.MemberID)
    .query(`UPDATE GroupMembers SET GroupID=@GroupID , MemberID=@MemberID WHERE  GroupID=@GroupID`)
    console.log(updatedGroup);
    return updatedGroup
  
  } catch (error) {
    return error
  }
}
