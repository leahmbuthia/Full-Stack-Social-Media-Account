import { sql } from "../utils/dbConnect.js";
import { poolRequest } from "../utils/dbConnect.js";
export const getUsersServices =async ()=>{
    try {
        const result =await poolRequest().query("SELECT * FROM Tbl_User");
        return result.recordset;
        
    } catch (error) {
        return error.message;
    }
}

export const addUsersService = async (User) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, User.UserID)
            .input('Username', sql.VarChar, User.Username)
            .input('Email', sql.VarChar, User.Email)
            .input('Password', sql.VarChar, User.Password)
            .input('TagName', sql.VarChar, User.TagName)
            .input('Location', sql.VarChar, User.Location)
            .query("insert into Tbl_User (UserID,Username, Email,Password,TagName,Location) values (@UserID,@Username,@Email,@Password,@TagName, @Location)");
        return result;
    } catch (error) {
        return error;
    }
}
export const updateUsersService = async (User) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, User.UserID)
            .input('Username', sql.VarChar, User.Username)
            .input('Email', sql.VarChar, User.Email)
            .input('Password', sql.VarChar, User.Password)
            .input('TagName', sql.VarChar, User.TagName)
            .input('Location', sql.VarChar, User.Location)
            .query("UPDATE Tbl_User SET Username = @Username, Email = @Email, Password = @Password, TagName = @TagName, Location = @Location WHERE UserID = @UserID");
        return result;
    } catch (error) {
        return error;
    }
}


export const deleteUsersService = async (UserID) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, UserID)
            .query("DELETE FROM Tbl_User WHERE UserID = @UserID");

        if (result.rowsAffected[0] === 0) {
            throw new Error('User not found');
        }
        return result;
    } catch (error) {
        throw error;
    }
}
export const getUserByIdService = async (UserID) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, UserID)
            .query("SELECT * FROM Tbl_User WHERE UserID =@UserID");

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




