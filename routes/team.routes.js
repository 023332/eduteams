import express from 'express';
import { createTeam, joinTeam, getMyTeams } from '../controllers/team.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import  roleMiddleware  from '../middleware/role.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware.onlyTeacher, createTeam);
router.post('/:id/join', authMiddleware, joinTeam);
router.get('/', authMiddleware, getMyTeams);

export default router;
