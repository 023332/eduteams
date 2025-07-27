const { Course } = require('../models/course.model');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newCourse = await Course.create({ title, description });
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error creating course', error });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses', error });
    }
};

// Get a course by ID
exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByPk(courseId);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching course', error });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description } = req.body;
        const [updated] = await Course.update({ title, description }, { where: { id: courseId } });
        if (updated) {
            const updatedCourse = await Course.findByPk(courseId);
            res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating course', error });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const deleted = await Course.destroy({ where: { id: courseId } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
};