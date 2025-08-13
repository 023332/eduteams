import express from 'express';
import { createTeam, joinTeam, getMyTeams, getTeamById, getTeamEditForm, updateTeam, deleteTeam } from '../controllers/team.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import  roleMiddleware  from '../middleware/role.js';
import { validateTeam } from '../middleware/validator.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware.onlyTeacher, validateTeam, createTeam);
router.post('/:id/join', authMiddleware, joinTeam);
router.get('/', authMiddleware, getMyTeams);
router.get('/:id', authMiddleware, getTeamById);
router.get('/:id/edit', authMiddleware, getTeamEditForm);
router.put('/:id', authMiddleware, validateTeam, updateTeam);
router.delete('/:id', authMiddleware, deleteTeam);

export default router;
