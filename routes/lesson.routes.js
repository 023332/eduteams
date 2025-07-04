import express from 'express';
import { createLesson, uploadFile, getLessonsByCourse } from '../controllers/lesson.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();


router.post('/', authMiddleware, roleMiddleware('teacher'), createLesson);


router.post('/upload', authMiddleware, roleMiddleware('teacher'), uploadFile);


router.get('/course/:id', authMiddleware, getLessonsByCourse);

export default router;
