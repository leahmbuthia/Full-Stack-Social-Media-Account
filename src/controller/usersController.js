import { sql } from '../utils/dbConnect.js'
import { getUsersServices,getUserByIdService ,addUsersService, updateUsersService, deleteUsersService} from "../services/usersServices.js"
import { usersValidator } from "../validators/usersValidator.js"
import { sendNotFound, sendSeverError,paginate,orderData,checkIfValuesIsEmptyNullUndefined,sendCreated,sendDeleteSuccess } from "../helper/helperFunctions.js";
import {v4} from 'uuid';

export const getUsers = async (req, res) => { //localhost:3000/todos?page=1&limit=10    
        try {
            const data = await getUsersServices();
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
   
    export const createUsers = async (req, res) => {
        const { Username, Email, Password, TagName, Location } = req.body;
       
        const { error } = usersValidator(req.body);
        const UserID=v4();
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
          
                const newUser = {
                    
                    UserID, //Generate uuid
                    Username,
                    Email,
                    Password,
                    TagName,
                    Location
                };
               
                    try {
                        let response = await addUsersService(newUser);
                        if (response.message) {
                            sendSeverError(res, response.message);
                        } else {
                            return res.status(201).json({ message: "User created successfully", user: newUser });
                        }
                    } catch (err) {
                        console.error("Error creating user:", err);
                        return res.status(500).json({ error: "Internal server error" });
                    }
                }
         
        }
   
    
export const getUserById = async (req, res) => {
            try {
                const UserID = req.params.UserID;
                const user = await getUserByIdService(UserID);
                
                if (user) {
                    return res.status(200).json({ user });
                } else {
                    return res.status(404).json({ error: 'User not found' });
                }
            } catch (error) {
                // Handle any unexpected errors
                return res.status(500).json({ error: error.message });
            }
        }
        
        
    export const updateUsers= async (req, res) => {
        try {
        const { Username, Email, Password, TagName, Location } = req.body;
        const UserID = req.params.UserID;
        const userToUpdate = await getUserByIdService(UserID);
            if (!userToUpdate) {
                sendNotFound(res, 'user not found');
            } else {
                if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
                    if (Username) {
                        userToUpdate.Username = Username;
                    }
                    if (Email) {
                        userToUpdate.Email = Email;
                    }
                    if (Password) {
                        userToUpdate.Password = Password;
                    }
                    if (TagName) {
                        userToUpdate.TagName = TagName;
                    }
                    if (Location) {
                        userToUpdate.Location = Location;
                    }
                    await updateUsersService(userToUpdate);
                    sendCreated(res, 'users updated successfully');
                } else {
                    sendSeverError(res, 'Please provide a completed field');
                }
            }
        } catch (error) {
            sendSeverError(res, error.message); // Fixed typo: sendSeverError -> sendServerError
        }
    }


    export const deleteUsers = async (req, res) => {
        try {
            const UserID = req.params.UserID;
            const result = await deleteUsersService(UserID);
    
            // Check if any rows are affected (user deleted)
            if (result.rowsAffected[0] > 0) {
                // Return a success message or any relevant data
                return res.status(200).json({ message: 'User deleted successfully' });
            } else {
                // If no user is deleted, return an error
                return res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            // Handle any unexpected errors
            return res.status(500).json({ error: error.message });
        }
    }
