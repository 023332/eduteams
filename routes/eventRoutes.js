import express from 'express';
import { createEvent, updateEvent, getEvents, registerForEvent, getUserEvents } from '../controllers/eventController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import multerConfig from '../middlewares/multerConfig.js';

const router = express.Router();
const upload = multer(multerConfig);


router.post('/', authenticateJWT, upload.single('image'), createEvent);


router.put('/:id', authenticateJWT, upload.single('image'), updateEvent);


router.get('/', getEvents);


router.post('/:id/register', authenticateJWT, registerForEvent);


router.get('/my-events', authenticateJWT, getUserEvents);

export default router;