import { Team, User, TeamMembership, Course } from '../models/index.js'; // Import models


export const createTeam = async (req, res) => {
    try {

        const { error } = validateTeam(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const { name, description } = req.body;
        const ownerId = req.user.id;

        const team = await Team.create({ name, description, ownerId });
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
};


export const joinTeam = async (req, res) => {
    try {
        const { teamId } = req.body;
        const userId = req.user.id;

        const membership = await TeamMembership.create({ userId, teamId });
        res.status(201).json(membership);
    } catch (error) {
        res.status(500).json({ message: 'Error joining team', error });
    }
};


export const getMyTeams = async (req, res) => {
    try {
        const userId = req.user.id;

        const teams = await Team.findAll({
            include: {
                model: User,
                through: TeamMembership,
                where: { id: userId },
            },
        });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving teams', error });
    }
};

export const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
        

        const team = await Team.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    through: TeamMembership,
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        });
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        

        const courses = await Course.findAll({
            where: { teamId: id }
        });
        
        res.render('teams/team-detail', { team, courses, user: req.user });
    } catch (error) {
        console.error('Error retrieving team:', error);
        res.status(500).json({ message: 'Error retrieving team', error });
    }
};

export const getTeamEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        

        const team = await Team.findByPk(id);
        
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        

        if (req.user.id !== team.ownerId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.render('teams/edit', { team, user: req.user });
    } catch (error) {
        console.error('Error loading team edit form:', error);
        res.status(500).json({ message: 'Error loading team edit form', error });
    }
};

export const updateTeam = async (req, res) => {
    try {

        const { error } = validateTeam(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const { id } = req.params;
        const { name, description } = req.body;
        
        const team = await Team.findByPk(id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        

        if (req.user.id !== team.ownerId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        await team.update({ name, description });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(team);
        }
        

        res.redirect(`/api/teams/${id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        
        const team = await Team.findByPk(id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        

        if (req.user.id !== team.ownerId) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        await team.destroy();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json({ message: 'Team deleted successfully' });
        }
        

        res.redirect('/teams');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
};