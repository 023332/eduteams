const { Lesson } = require('../models/lesson.model');
const { Course } = require('../models/course.model');

// Add a new lesson
exports.addLesson = async (req, res) => {
    try {
        const { title, content, courseId } = req.body;

        // Check if the course exists
        const course = await Course.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create the lesson
        const lesson = await Lesson.create({ title, content, courseId });
        return res.status(201).json(lesson);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding lesson', error });
    }
};

// Get all lessons for a specific course
exports.getLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find lessons associated with the course
        const lessons = await Lesson.findAll({ where: { courseId } });
        return res.status(200).json(lessons);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving lessons', error });
    }
};