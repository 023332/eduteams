const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson.controller');
const { validateLesson } = require('../middleware/validator');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Route to add a new lesson
router.post('/', auth, role('Teacher'), validateLesson, lessonController.addLesson);

// Route to get all lessons for a specific course
router.get('/course/:courseId', lessonController.getLessonsByCourse);

// Route to get a specific lesson by ID
router.get('/:id', lessonController.getLessonById);

// Route to update a lesson by ID
router.put('/:id', auth, role('Teacher'), validateLesson, lessonController.updateLesson);

// Route to delete a lesson by ID
router.delete('/:id', auth, role('Teacher'), lessonController.deleteLesson);

module.exports = router;