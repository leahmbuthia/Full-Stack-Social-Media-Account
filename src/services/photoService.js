import { poolRequest, sql } from "../utils/dbConnect.js";

export const createPhotoService = async (photo) => {
    try {
        const result = await poolRequest()
            .input('UserID', sql.VarChar, photo.UserID)
            .input('PhotoID', sql.VarChar, photo.PhotoID)
            .input('PhotoURL', sql.VarChar, photo.PhotoURL)
            .input('UploadDate', sql.DateTime, new Date())
            .query('INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate) VALUES (@PhotoID, @UserID, @PhotoURL, @UploadDate)');

        console.log('Create Photo Service Result:', result);
        return result;
    } catch (error) {
        console.error('Error in createPhotoService:', error);
        throw error;
    }
};
export const updatePhotoService = async (updatePhoto) => {
    try {
        const updatedPhoto=await poolRequest()
        .input('PhotoID', sql.VarChar,updatePhoto.PhotoID )
        .input('PhotoURL', sql.VarChar,updatePhoto.PhotoURL)
        .input('UploadDate', sql.DateTime,updatePhoto.UploadDate)
        .query(`UPDATE Photo  SET PhotoID=@PhotoID, PhotoURL=@PhotoURL, UploadDate=@UploadDate  WHERE  PhotoID=@PhotoID`)
    console.log("updated",updatePhoto);
      return updatedPhoto
      
      } catch (error) {
        return error
      }
};
export const deletePhotoService = async (PhotoID) => {
    const deletedPhoto= await poolRequest()
    .input('PhotoID', sql.VarChar,PhotoID)
    .query('DELETE FROM Photo WHERE PhotoID = @PhotoID ')
    console.log('single photo',deletedPhoto.recordset);
    return deletedPhoto.recordset;
};
export const getAllPhotosService = async () => {
    try {
        const allPhotos = await poolRequest().query('SELECT * FROM Photo');
        console.log('All Photos:', allPhotos.recordset);
        return allPhotos.recordset;
    } catch (error) {
        console.error('Error in getAllPhotosService:', error);
        throw error;
    }
};
export const getSinglePhotoService = async (PhotoID) => {
    try {
        const singlePhoto = await poolRequest()
            .input('PhotoID', sql.VarChar, PhotoID)
            .query('SELECT * FROM Photo WHERE PhotoID =@PhotoID');

        console.log('Single Photo:', singlePhoto.recordset);
        return singlePhoto.recordset;
    } catch (error) {
        console.error('Error in getSinglePhotoService:', error);
        throw error;
    }
};


