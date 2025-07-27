const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { validateCourse } = require('../middleware/validator');
const { auth } = require('../middleware/auth');
const { role } = require('../middleware/role');

// Route to create a new course
router.post('/', auth, role('Teacher'), validateCourse, courseController.createCourse);

// Route to get all courses
router.get('/', courseController.getAllCourses);

// Route to get a specific course by ID
router.get('/:id', courseController.getCourseById);

// Route to update a course by ID
router.put('/:id', auth, role('Teacher'), validateCourse, courseController.updateCourse);

// Route to delete a course by ID
router.delete('/:id', auth, role('Teacher'), courseController.deleteCourse);

module.exports = router;