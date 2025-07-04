import express from 'express';
import { createCourse, getCoursesByTeam } from '../controllers/course.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import   roleMiddleware  from '../middleware/role.js';

const router = express.Router();


router.post('/', authMiddleware, roleMiddleware.onlyTeacher, createCourse);


router.get('/team/:teamId', authMiddleware, getCoursesByTeam);

export default router;