import express from 'express';
import { createLesson, uploadFile, getLessonsByCourse } from '../controllers/lesson.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

// Create a new lesson
router.post('/', authMiddleware, roleMiddleware('teacher'), createLesson);

// Upload a file for a lesson
router.post('/upload', authMiddleware, roleMiddleware('teacher'), uploadFile);

// Get lessons by course ID
router.get('/course/:id', authMiddleware, getLessonsByCourse);

export default router;
