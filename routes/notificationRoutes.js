import express from 'express';
import { sendEventConfirmation, notifyEventUpdate } from '../controllers/notificationController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';
import emailService from '../services/emailService.js';





const router = express.Router();


router.post('/event-confirmation', authenticateJWT, sendEventConfirmation);

router.post('/event-update', authenticateJWT, notifyEventUpdate);

export default router;