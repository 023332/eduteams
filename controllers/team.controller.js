import { Team, User, TeamMembership } from '../models/index.js'; // Import models


export const createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const ownerId = req.user.id;

        const team = await Team.create({ name, ownerId });
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