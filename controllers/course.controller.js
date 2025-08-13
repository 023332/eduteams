import  Course  from '../models/course.model.js';
import  Team  from '../models/team.model.js';
import  Lesson  from '../models/lesson.model.js';
import { TeamMembership } from '../models/index.js';
import { validateCourse } from '../middleware/validator.js';

export const createCourse = async (req, res) => {
    try {
        const { error } = validateCourse(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        
        const { title, description, teamId, startDate, endDate } = req.body;
        const createdBy = req.user.id;


        const membership = await TeamMembership.findOne({
            where: { userId: createdBy, teamId }
        });
        
        if (!membership) {
            return res.status(403).json({ message: 'You must be a member of the team to create a course' });
        }
        
        const course = await Course.create({
            title,
            description,
            teamId,
            createdBy,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null
        });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(201).json(course);
        }
        

        res.redirect(`/teams/${teamId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

export const getCoursesByTeam = async (req, res) => {
    try {
        const { teamId } = req.params;
        const courses = await Course.findAll({
            where: { teamId },
            include: [{ model: Team, attributes: ['name'] }]
        });

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(courses);
        }

        res.render('courses/list', { courses, teamId });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving courses', error });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        

        const course = await Course.findByPk(id, {
            include: [{ model: Team, attributes: ['name'] }]
        });
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        

        const lessons = await Lesson.findAll({
            where: { courseId: id },
            order: [['order', 'ASC']]
        });
        

        let enrollment = null;
        if (req.user && req.user.role === 'student') {
            const Enrollment = (await import('../models/index.js')).Enrollment;
            enrollment = await Enrollment.findOne({
                where: { userId: req.user.id, courseId: id }
            });
        }
        
        res.render('courses/detail', { course, lessons, user: req.user, enrollment });
    } catch (error) {
        console.error('Error retrieving course:', error);
        res.status(500).json({ message: 'Error retrieving course', error });
    }
};

export const getCourseEditForm = async (req, res) => {
    try {
        const { id } = req.params;
        

        const course = await Course.findByPk(id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        

        if (req.user.role !== 'teacher' && req.user.id !== course.createdBy) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.render('courses/edit', { course, user: req.user });
    } catch (error) {
        console.error('Error loading course edit form:', error);
        res.status(500).json({ message: 'Error loading course edit form', error });
    }
};


export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, teamId, startDate, endDate } = req.body;
        
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        

        if (req.user.role !== 'teacher' && req.user.id !== course.createdBy) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        await course.update({
            title,
            description,
            teamId,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null
        });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(course);
        }
        

        res.redirect(`/courses/${id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};


export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        await course.destroy();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json({ message: 'Course deleted successfully' });
        }
        

        res.redirect(`/teams/${course.teamId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};