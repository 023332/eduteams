import express from 'express';
import { createCourse, getCoursesByTeam, getCourseById, getCourseEditForm, updateCourse, deleteCourse } from '../controllers/course.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';
import { validateCourse } from '../middleware/validator.js';

const router = express.Router();


router.post('/', authMiddleware, roleMiddleware.onlyTeacher, validateCourse, createCourse);


router.get('/team/:teamId', authMiddleware, getCoursesByTeam);

router.get('/:id', authMiddleware, getCourseById);
router.get('/:id/edit', authMiddleware, getCourseEditForm);

router.put('/:id', authMiddleware, roleMiddleware.onlyTeacher, validateCourse, updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware.onlyTeacher, deleteCourse);

export default router;