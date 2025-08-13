import { Enrollment, Course, User } from '../models/index.js';

export const enrollInCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        

        const existingEnrollment = await Enrollment.findOne({
            where: { userId, courseId }
        });
        
        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }
        

        const enrollment = await Enrollment.create({ userId, courseId });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(201).json(enrollment);
        }
        

        res.redirect(`/courses/${courseId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error enrolling in course', error });
    }
};

export const getEnrollmentsByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const enrollments = await Enrollment.findAll({
            where: { userId },
            include: [{ model: Course, include: [User] }]
        });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(enrollments);
        }
        

        res.render('enrollments/list', { enrollments, user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error });
    }
};

export const getEnrollmentsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const enrollments = await Enrollment.findAll({
            where: { courseId },
            include: [User]
        });
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(enrollments);
        }
        

        res.render('enrollments/course-enrollments', { enrollments, courseId, user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving enrollments', error });
    }
};

export const updateEnrollmentProgress = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        const { progress, lessonId } = req.body;
        
        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        

        enrollment.progress = progress;
        

        if (progress === 100) {
            enrollment.completionDate = new Date();
        }
        
        await enrollment.save();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(enrollment);
        }
        

        res.redirect(`/courses/${enrollment.courseId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error updating enrollment progress', error });
    }
};

export const markLessonAsComplete = async (req, res) => {
    try {
        const { enrollmentId, lessonId } = req.params;
        

        
        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        

        const Lesson = (await import('../models/index.js')).Lesson;
        const Course = (await import('../models/index.js')).Course;
        
        const course = await Course.findByPk(enrollment.courseId);
        const lessons = await Lesson.findAll({ where: { courseId: course.id } });
        

        let newProgress = enrollment.progress + 10;
        if (newProgress > 100) newProgress = 100;
        
        enrollment.progress = newProgress;
        

        if (newProgress === 100) {
            enrollment.completionDate = new Date();
        }
        
        await enrollment.save();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json(enrollment);
        }
        

        res.redirect(`/courses/${enrollment.courseId}`);
    } catch (error) {
        res.status(500).json({ message: 'Error marking lesson as complete', error });
    }
};

export const unenrollFromCourse = async (req, res) => {
    try {
        const { enrollmentId } = req.params;
        
        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        
        await enrollment.destroy();
        

        if (req.headers['content-type'] === 'application/json') {
            return res.status(200).json({ message: 'Successfully unenrolled from course' });
        }
        

        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Error unenrolling from course', error });
    }
};