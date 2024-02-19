import { Router } from 'express';
import { createPhotoController, deletePhotoController, getAllPhotosController, updatePhotoController,getSinglePhotoController } from '../controller/photoController.js';

const photoRouter = Router();

photoRouter.post('/photos', createPhotoController);
photoRouter.get('/photos', getAllPhotosController);
photoRouter.get('/photos/:PhotoID', getSinglePhotoController);
photoRouter.put('/photos/:PhotoID', updatePhotoController);
photoRouter.delete('/photos/:PhotoID', deletePhotoController);

export default photoRouter;
