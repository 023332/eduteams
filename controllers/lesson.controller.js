import  Lesson  from '../models/lesson.model.js';
import  Course  from '../models/course.model.js';
import multer from 'multer';
import path from 'path';

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Create a lesson
export const createLesson = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const lesson = await Lesson.create({ title, content, fileUrl, courseId });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson', error });
  }
};

// Upload a file
export const uploadFile = upload.single('file');

// Get lessons by course
export const getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.findAll({ where: { courseId } });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving lessons', error });
  }
};