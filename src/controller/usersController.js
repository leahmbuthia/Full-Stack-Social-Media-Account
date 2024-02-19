import { sql } from '../utils/dbConnect.js'
import { getUsersServices,getUserByIdService ,addUsersService, updateUsersService, deleteUsersService, getUserByEmailService} from "../services/usersServices.js"
import { userLoginValidator,  usersValidator } from "../validators/usersValidator.js"
import { sendNotFound, sendSeverError,paginate,orderData,checkIfValuesIsEmptyNullUndefined,sendCreated,sendDeleteSuccess, notAuthorized, sendBadRequest } from "../helper/helperFunctions.js";
import {v4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { sendServerError } from '../Comment/Helper/responseFunction.js';
import nodemailer from 'nodemailer'
// import logger from './src/utils/logger.js';
import logger from '../utils/logger.js';
import emailTemp from '../emailTemp.js';


export const loginUser = async (req, res) => {
    try {
     
      const { error } = userLoginValidator(req.body);
      if (error) {
        return sendBadRequest(res, error.details[0].message);
      }
   
      const { Email, Password } = req.body;
   
      // Check if the user exists
      const user = await getUserByEmailService(Email);
      if (!user) {
        return sendNotFound(res, "User not found");
      }
   
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(Password, user.Password);
      if (!isPasswordValid) {
        return sendBadRequest(res, "Invalid password");
      }
   
      // Generate JWT token
      const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, {
        expiresIn: "24h", // Set an appropriate expiration time
      });
   
      // Send success message along with token
      res.json({ message: "Logged in successfully", token });
    } catch (error) {
      sendServerError(res, error.message);
    }
  };

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

        try {
            const { Username, Email, Password, TagName, Location } = req.body;
            console.log(req.body);
        
            const existingUser = await getUserByEmailService(Email);
            console.log(existingUser);
          if (existingUser) {
            return res.status(400).send("User with the provided email or username already exists");
          }else{
      
            const UserID = v4();
            const { error } = usersValidator({ Username, Email, Password, TagName, Location });
            console.log("error",error);
            if (error) {
              return res.status(400).send(error.details[0].message);
            } else {
              const hashedPassword = await bcrypt.hash(Password, 8);
              const registeredUser = { UserID, Username, Email, Password: hashedPassword, TagName, Location };
        
              const result = await addUsersService(registeredUser);
        
              if (result.message) {
                sendServerError(res, result.message)
            } else {
                sendMail(registeredUser.Email);
                sendCreated(res, 'User created successfully');
            }
            }
          }
          } catch (error) {
            sendServerError(res, error.message);
          }
        }
    
 export const sendMail = async (email) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Welcome to social media platform!',
                // text: 'test 2 sending dummy emails!'
                html: emailTemp
            };
            try {
                logger.info('Sending mail....');
                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        logger.error(error);
                        res.status(500).send(error);
                    } else {
                        logger.info(`Email sent: ${info.response}`);
                        res.status(500).send(error);
                    }
                });
            } catch (error) {
                logger.error(error);
            }
        };

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
                        const hashedPassword = await bcrypt.hash(Password, 8);
                        userToUpdate.Password = hashedPassword;
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
