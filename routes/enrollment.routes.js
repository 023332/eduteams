import express from 'express';
import { enrollInCourse, getEnrollmentsByUser, getEnrollmentsByCourse, updateEnrollmentProgress, markLessonAsComplete, unenrollFromCourse } from '../controllers/enrollment.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();


router.post('/', authMiddleware, enrollInCourse);


router.get('/', authMiddleware, getEnrollmentsByUser);


router.get('/course/:courseId', authMiddleware, getEnrollmentsByCourse);


router.put('/:enrollmentId', authMiddleware, updateEnrollmentProgress);


router.post('/:enrollmentId/lessons/:lessonId/complete', authMiddleware, markLessonAsComplete);


router.delete('/:enrollmentId', authMiddleware, unenrollFromCourse);

export default router;