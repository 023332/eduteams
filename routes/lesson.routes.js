import express from 'express';
import { createLesson, uploadFile, getLessonsByCourse, getLessonById, createLessonForm, getLessonEditForm, updateLesson, deleteLesson } from '../controllers/lesson.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.middleware.js';
import { validateLesson } from '../middleware/validator.js';

const router = express.Router();


router.post('/', authMiddleware, roleMiddleware('teacher'), validateLesson, uploadFile, createLesson);


router.post('/upload', authMiddleware, roleMiddleware('teacher'), uploadFile);


router.get('/course/:id', authMiddleware, getLessonsByCourse);

router.get('/:id', authMiddleware, getLessonById);

router.get('/create', authMiddleware, roleMiddleware('teacher'), createLessonForm);
router.get('/:id/edit', authMiddleware, roleMiddleware('teacher'), getLessonEditForm);

router.put('/:id', authMiddleware, roleMiddleware('teacher'), validateLesson, uploadFile, updateLesson);
router.delete('/:id', authMiddleware, roleMiddleware('teacher'), deleteLesson);

export default router;
