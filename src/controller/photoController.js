import { v4 as uuidv4 } from 'uuid';
import { sendCreated, sendDeleteSuccess, sendSeverError } from "../helper/helperFunctions.js";
import { createPhotoService, deletePhotoService, getAllPhotosService, getSinglePhotoService, updatePhotoService } from '../services/photoService.js';
import { createPhotoValidator, updatePhotoValidator } from '../validators/photoValidator.js';
import { sendServerError } from '../Comment/Helper/responseFunction.js';

export const createPhotoController = async (req, res) => {
    try {
        const { UserID, PhotoURL } = req.body;
        const PhotoID = uuidv4();
        
        // Validate the request body
        const { error } = createPhotoValidator({ PhotoURL });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        
        // Get the current date for UploadDate
        const uploadDate = new Date();    

        // Create the photo object
        const createdPhoto = { UserID, PhotoID, PhotoURL, UploadDate: uploadDate };

        // Call the create photo service
        const result = await createPhotoService(createdPhoto);

        // Check for errors in the result
        if (result.error) {
            sendSeverError(res, result.error);
        } else {
            sendCreated(res, 'Photo created successfully');
        }
    } catch (error) {
        sendSeverError(res, error.message);
    }
};

export const updatePhotoController = async (req, res) => {
    try {
        const { PhotoURL } = req.body;
        const { PhotoID } = req.params;

        const uploadDate = new Date(); // Changed variable name to avoid conflict   
        
        // Validate the request body
        const { error } = updatePhotoValidator({ PhotoURL });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Update the photo in the database
        const updatedPhoto = await updatePhotoService({PhotoURL,PhotoID, uploadDate });

        // Check for errors in the updatedPhoto response
        if (updatedPhoto.error) {
            return sendServerError(res, updatedPhoto.error);
        }

        // Send success response
        return sendCreated(res, 'Photo updated successfully');
    } catch (error) {
        // Handle internal server error
        return sendSeverError(res, 'Internal server error');
    }
};

export const getSinglePhotoController = async (req, res) => {
    try {
        const { PhotoID } = req.params;
        const singlePhoto= await getSinglePhotoService(PhotoID);
        
        if (!singlePhoto) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.status(200).json({ photo: singlePhoto });
    } catch (error) {
        sendSeverError(res, 'Internal server error');
    }
};
export const getAllPhotosController = async (req, res) => {
    try {
        const photo= await getAllPhotosService();
        res.status(200).json({ photo });
    } catch (error) {
        console.error("Error fetching all posts:", error);
        res.status(500).json("Internal server error");
    }
};

export const deletePhotoController = async (req, res) => {
    try {
        const {PhotoID}=req.params
        const deletedPhoto=await deletePhotoService(PhotoID)
        console.log('deleted photo',deletedPhoto); 
        sendDeleteSuccess(res,"Deleted successfully")
      } catch (error) {
        return error
      }
};
