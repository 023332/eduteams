import  Course  from '../models/course.model.js';
import  Team  from '../models/team.model.js';

export const createCourse = async (req, res) => {
    try {
        const { title, teamId } = req.body;
        const course = await Course.create({ title, teamId });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

export const getCoursesByTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const courses = await Course.findAll({ where: { teamId } });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error });
    }
};